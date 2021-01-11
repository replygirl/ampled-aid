import tc from '@replygirl/tc'
import type { NowResponse } from '@vercel/node'

import ping from './_ping'
import type { TwilioSmsIncomingRequest } from './_types'

export default async (req: TwilioSmsIncomingRequest, res: NowResponse) => (
  await tc<NowResponse>(
    async () => {
      const { body } = req.body

      if (body === 'ping') await ping(req)

      return res.status(200)
    },
    async () => res.status(500)
  )
)[0]?.end()
