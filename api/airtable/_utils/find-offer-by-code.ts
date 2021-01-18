import type { Offer, OfferFields } from '../_types'
import getTable from './get-table'

export default async (code: number | string) => {
  const { items: [offer] } = await getTable<OfferFields, Offer>('Offers', {
    filterByFormula: `Code = '${code}'`
  })

  return offer
}
