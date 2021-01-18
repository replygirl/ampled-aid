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

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsMessage = camelCase(req.body)
      const {
        id,
        editing: [editingId] = [],
        editingField
      }: Person = (await findPerson(msg)) ?? await createPerson(msg)

      console.log('person id', undefined)

      switch (msg.body) {
        case 'OFFER':
          const { id: offerId } = await createOffer(id)
          await editOffer(msg, offerId)
          break
        default:
          if (editingId) await editOffer(msg, editingId, editingField)
      }

      if (editingId) {
        const { editing, offer } = await editOffer(msg, editingId, editingField)
        await updatePerson(id, {
          editing: editing ? [offer.id] : [],
          editingField: editing
        })
      }

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
