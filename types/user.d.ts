import type { Meta } from './meta'
import type {
  Page,
  PropValuePhoneNumber,
  PropValueRelation,
  PropValueText,
  PropValueTitle
} from './notion'
import type { Offer } from './offer'

export type User = Meta & {
  handle?: string | null
  name?: string | null
  offers?: Offer[]
  phone?: string | null
  rollHandle?: string | null
  verificationHash?: string | null
}

export type UserPage = Page<User> & {
  properties: MetaProps & {
    handle?: PropValueTitle
    name?: PropValueText
    offers?: PropValueRelation
    phone?: PropValuePhoneNumber
    rollHandle?: PropValueText
    verificationHash?: PropValueText
  }
}
