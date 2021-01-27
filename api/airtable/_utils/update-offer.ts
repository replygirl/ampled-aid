import type { OfferFields, Offer } from '../_types'
import updateRecord from './update-record'

export default (id: string, data: Partial<Offer>) =>
  updateRecord<OfferFields, Offer>('Offers', id, data)
