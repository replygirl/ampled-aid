import { camelCase } from '@replygirl/change-case-object'
import tc from '@replygirl/tc'
import type { NowRequest, NowResponse } from '@vercel/node'
import sum from 'hash-sum'

import { query, update } from '../_utils'

export default async (req: NowRequest, res: NowResponse) =>
  res
    .status(
      (
        await tc(async () => {
          const { code, phoneNumber } = camelCase(req.body)

          const [u] = await query('users', {
            filter: {
              property: 'Phone',
              phoneNumber: {
                equals: phoneNumber
              }
            }
          })
          if (!u) return 404

          const verified = sum(code) === sum(u.properties.verificationHash)

          await update(u.id, {
            verificationHash: verified
              ? ''
              : sum(Math.floor(Math.random() * 1_000_000))
          })

          return verified ? 200 : 401
        })
      )[0] ?? 500
    )
    .end()
