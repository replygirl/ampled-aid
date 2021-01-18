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

      console.log('person id', id)

      switch (msg.body) {
        case 'OFFER':
          const { id: offerId } = await createOffer(id)
          await editOffer(msg, offerId)
          break
        default:
          if (editingId) await editOffer(msg, editingId, editingField)
      }

      if (editingId) await editOffer(msg, editingId, editingField)

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
