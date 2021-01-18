import type { Offer, OfferFields } from '../_types'
import findRecord from './find-record'

export default (id: string) => findRecord<OfferFields, Offer>('Offers', id)
