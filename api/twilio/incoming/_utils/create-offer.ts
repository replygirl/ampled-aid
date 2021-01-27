import type { Offer, OfferFields } from '../../../airtable/_types'
import { createRecord } from '../../../airtable/_utils'

export default (personRecordId: string) =>
  createRecord<OfferFields, Offer>('Offers', {
    from: [personRecordId],
    status: 'draft'
  })
