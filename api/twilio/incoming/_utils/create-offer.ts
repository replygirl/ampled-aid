import { pascalCase } from '@replygirl/change-case-object'

import type { Offer, OfferFields, OfferRecord } from '../../../airtable/_types'
import { base, parseRecord } from '../../../airtable/_utils'
import type { TwilioSmsMessage } from '../_types'

export default ({ from }: TwilioSmsMessage) =>
  new Promise<Offer>((resolve, reject) =>
    base<OfferFields>('Offers').create(
      [{ fields: pascalCase({ from, status: 'Draft' }) as OfferFields }],
      (error, [record] = []) => {
        if (error) reject()

        const offer: Offer = parseRecord(record)
        resolve(offer)
    )
  )
