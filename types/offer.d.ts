import type {
  Page,
  PropValueFiles,
  PropValueMultiSelect,
  PropValueRelation,
  PropValueText,
  PropValueTitle,
  PropValueUrl
} from './notion'
import type { Meta, MetaProps } from './meta'
import type { User } from './user'

export type Offer = Meta & {
  tags?: string[] | null
  name?: string | null
  description?: string | null
  files?: string[] | null
  url?: string | null
  owners?: User[] | null
}

export type OfferPage = Page<Offer> & {
  properties: MetaProps & {
    tags?: PropValueMultiSelect
    name?: PropValueTitle
    description?: PropValueText
    files?: PropValueFiles
    url?: PropValueUrl
    owners?: PropValueRelation
  }
}
