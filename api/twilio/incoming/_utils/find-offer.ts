import { findRecord } from '../../../airtable/_utils'
import type { Offer, OfferFields } from '../../../airtable/_types'

export default async (id: string) =>
  await findRecord<OfferFields, Offer>('Offers', id)
