import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { Person } from '../../airtable/_types'
import { updatePerson } from '../../airtable/_utils'
import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import {
  createOffer,
  createPerson,
  editOffer,
  findPerson
} from './_utils'

const setOffer = async (
  msg: TwilioSmsMessage,
  personId?: string,
  offerId?: string,
  field?: string | null
) => {
  const { editing, offer } = await editOffer(msg, offerId as string, field)
  console.log(editing, offer)
  await updatePerson(personId as string, {
    editing: editing ? [offerId as string] : [],
    editingField: editing
  })
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

      console.log('person id', personId)

      switch (msg.body) {
        case 'OFFER':
          const { id: offerId } = await createOffer(personId as string)
          await setOffer(msg, personId, offerId)
          break
        default:
          if (editingId) await setOffer(msg, personId, editingId, editingField)
      }

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
