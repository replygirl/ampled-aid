import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import type { TwilioSmsMessage, TwilioSmsIncomingRequest } from './_types'
import { pong } from './_utils'

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsMessage = camelCase(req.body)

      if (msg.body === 'ping') await pong(msg)

      if (msg.body === 'OFFER') await createOffer(msg)

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
