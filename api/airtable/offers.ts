import tc from '@replygirl/tc'
import type { NowRequest, NowResponse } from '@vercel/node'

import type { Offer, OfferFields } from './_types'
import { getTable } from './_utils'

export default (req: NowRequest, res: NowResponse) => tc(
  async () => {
    const { items: offers } = await getTable<OfferFields, Offer>('Offers')
    res.status(200).json({ offers })
  },
  async () => res.status(500).end()
)
