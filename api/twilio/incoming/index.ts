import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { Person } from '../../airtable/_types'
import { findOfferByCode, updatePerson } from '../../airtable/_utils'
import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import {
  createMessageReply,
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
      const { body } = msg
      const person: Person = await findPerson(msg)
      const {
        id: personId,
        name: personName,
        editing: [editingId] = [],
        editingField
      } = person

      console.info(
        `person ${personId} is editing ${editingField} of ${editingId}`
      )

      if (!personId) {
        await createPerson(msg)
        await createMessageReply(msg,
          `Hold on, we just met. What's your name? (It can be fake I won't be offended`
        )
        return res.status(200)
      }

      if (!personName) {
        await updatePerson(personId, { name: body })
        await createMessageReply(msg,
          `Nice to meet you ${body}. Can you repeat what you said before?`
        )
        return res.status(200)
      }

      if (/^RESPOND \d+ .+$/.test(body)) await createResponse(msg)
      else if (/^EDIT(?: \d+)?$/.test(body)) {
        await setEditStatus(...await showEditMenu(msg, person))
        return res.status(200)
      }
      else if (/^\d+$/.test(body)) {
        const { id: selectedId } = await findOfferByCode(body)
        await setOffer(msg, personId, selectedId)
        return res.status(200)
      }

      switch (body) {
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
