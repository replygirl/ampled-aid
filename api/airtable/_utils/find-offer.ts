import { findRecord } from '.'
import type { Offer, OfferFields } from '../_types'

export default (id: string) => findRecord<OfferFields, Offer>('Offers', id)
