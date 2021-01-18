import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { Person } from '../../airtable/_types'
import { updatePerson } from '../../airtable/_utils'
import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import {
  createOffer,
  createPerson,
  createResponse,
  editOffer,
  findPerson,
  showEditMenu
} from './_utils'

const setEditStatus = (
  personId?: string,
  offerId?: string | null,
  editing?: string | null,
) => updatePerson(personId as string, {
  editing: !!editing && !!offerId ? [offerId as string] : [],
  editingField: editing
})

const setOffer = async (
  msg: TwilioSmsMessage,
  personId?: string,
  offerId?: string,
  field?: string | null
) => {
  const { editing } = await editOffer(msg, offerId as string, field)
  console.log('hi')
  try {
    await setEditStatus(personId, offerId, editing)
  } catch(e) { console.log(e) }
  console.log('hello')
}

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsMessage = camelCase(req.body)
      const person: Person = (await findPerson(msg)) ?? await createPerson(msg)
      const {
        id: personId,
        editing: [editingId] = [],
        editingField
      } = person

      console.info(
        `person ${personId} is editing ${editingField} of ${editingId}`
      )

      if (/^RESPOND \d+ .+$/.test(msg.body)) await createResponse(msg)
      if (/^EDIT(?: \d+)?$/.test(msg.body))
        setEditStatus(...await showEditMenu(msg, person))

      switch (msg.body) {
        case 'OFFER':
          const { id: offerId } = await createOffer(personId as string)
          await setOffer(msg, personId, offerId)
          break
        default:
          if (editingId) await setOffer(msg, personId, editingId, editingField)
          else await setEditStatus(personId, null, null)
      }

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
