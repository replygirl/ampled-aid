import { getTable, parseRecord } from '../../../airtable/_utils'
import type { Offer, OfferFields } from '../../../airtable/_types'
import type { TwilioSmsMessage } from '../_types'

export default async ({ from }: TwilioSmsMessage) => {
  const { items: [offer] } = await getTable<OfferFields, Offer>('Offers', {
    filterByFormula: `AND(From = '${from}', Status = 'Draft')`
  })

  return offer
}
