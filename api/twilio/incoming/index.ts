import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import pong from './_pong'
import type { TwilioSmsIncoming, TwilioSmsIncomingRequest } from './_types'

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const msg: TwilioSmsIncoming = camelCase(req.body)

      if (msg.body === 'ping') await pong(msg)

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
