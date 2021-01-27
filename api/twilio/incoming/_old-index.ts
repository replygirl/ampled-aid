import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import {
  createOffer,
  findOfferDraft,
  pong,
  solicitOfferDetails
} from './_utils'

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsMessage = camelCase(req.body)
      const { body } = msg
      const offerCode = body.match(/\d+/)?.[0]

      const commands: [string, (x: string) => boolean][] = [
        ['closeOffer',     x => /^CLOSE \d+$/.test(x)],
        ['createOffer',    x => x === 'OFFER'],
        ['pong',           x => x === 'ping'],
        ['respondToOffer', x => /^RESPOND TO \d+$/.test(x)]
      ]

      const command = commands.find(([_, v]) => v(body))?.[0]

      // One-off commands
      if (command === 'pong')           await pong(msg)
      if (command === 'respondToOffer') await respondToOffer(offerCode)
      if (command === 'closeOffer')     await closeOffer(offerCode)

      // Offer creation
      let draft = await findOfferDraft(msg)
      if (command === 'createOffer') {
        if (draft) await rejectOffer(msg)
        else draft = await createOffer(msg)
      }
      if (!command && draft) await updateOfferDetails(draft, msg)
      if (draft) await solicitOfferDetails(draft)

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
