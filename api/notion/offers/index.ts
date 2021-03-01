import type { VercelRequest, VercelResponse } from '@vercel/node'

import type { Offer } from '/?'

import { cors, queryDb } from '../../_utils'

export default async (_req: VercelRequest, res: VercelResponse) => {
  cors(res, 'get')

  const offers = await queryDb<Offer>('offers', {
    filter: {
      or: [
        {
          property: 'visible',
          checkbox: {
            equals: true
          }
        }
      ]
    }
  })

  res.send(
    offers.map(({ owners, ...x }) => ({
      ...x,
      owners: owners?.map(o =>
        Object.entries(o)
          .filter(([k]) => !['name', 'phone', 'verificationHash'].includes(k))
          .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
      )
    }))
  )
}
