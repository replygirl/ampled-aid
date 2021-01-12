import Airtable from 'airtable'

import type { OfferFields } from '../_types'

const {
  AIRTABLE_API_KEY: apiKey = '',
  AIRTABLE_BASE_ID: baseId = ''
} = process.env

Airtable.configure({ apiKey })

const base = Airtable.base(baseId)

export const offers = base<OfferFields>('Offers')

export default base
