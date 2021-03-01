import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowRequest, NowResponse } from '@vercel/node'
import sum from 'hash-sum'

import { createMessage, query, update } from '../_utils'

export default async (req: NowRequest, res: NowResponse) =>
  res
    .status(
      (
        await tc(async () => {
          const { phoneNumber } = camelCase(req.body)

          const [u] = await query('users', {
            filter: {
              property: 'Phone',
              phoneNumber: {
                equals: phoneNumber
              }
            }
          })
          if (!u) return 404

          const code = Math.floor(Math.random() * 1_000_000)

          await update(u.id, { verificaitonHash: sum(code) })

          await createMessage(phoneNumber, `Your verification code is ${code}`)

          return 200
        })
      )[0] ?? 500
    )
    .end()
