import type { FieldSet } from 'airtable'

export interface Offer {
  id: string
  code?: number
  category?: string
  type?: string
  name?: string
  description?: string
}

export interface OfferFields extends FieldSet {
  Code: number
  Category: string
  Type: string
  Name: string
  Description: string
}
