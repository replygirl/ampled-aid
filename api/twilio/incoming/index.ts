import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { Offer, Person } from '../../airtable/_types'
import { updatePerson } from '../../airtable/_utils'
import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import {
  createOffer,
  createPerson,
  editOffer,
  findPerson
} from './_utils'

const setEditStatus = (
  personId?: string,
  offerId?: string,
  editing?: string | null,
) => updatePerson(personId as string, {
  editing: editing && offerId ? [offerId as string] : [],
  editingField: editing
})

const setOffer = async (
  msg: TwilioSmsMessage,
  personId?: string,
  offerId?: string,
  field?: string | null
) => {
  const { editing } = await editOffer(msg, offerId as string, field)
  return setEditStatus(personId, offerId, editing)
}

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsMessage = camelCase(req.body)
      const {
        id: personId,
        editing: [editingId] = [],
        editingField
      }: Person = (await findPerson(msg)) ?? await createPerson(msg)

      console.info(
        `person ${personId} is editing ${editingField} of ${editingId}`
      )

      switch (msg.body) {
        case 'OFFER':
          const { id: offerId } = await createOffer(personId as string)
          await setOffer(msg, personId, offerId)
          break
        default:
          if (editingId) await setOffer(msg, personId, editingId, editingField)
          else await setEditStatus(personId, offerId, null)
      }

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
