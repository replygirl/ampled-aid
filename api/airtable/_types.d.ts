import type { FieldSet, Record } from 'airtable'

export interface Offer {
  id: string
  code?: number
  from: string
  category?: string
  type?: string
  name?: string
  description?: string
}

export interface OfferFields extends FieldSet {
  Code: number
  From: string
  Category: string
  Type: string
  Name: string
  Description: string
}

export type OfferRecord = Record<OfferFields>
