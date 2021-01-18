import type { FieldSet, Record } from '@replygirl/airtable'

export interface Resource extends Dictionary<any> {
  id?: string
}

export interface Offer extends Resource {
  [key: string]: any
  code?: number
  from: string[]
  editor?: string[]
  category?: string
  subcategory?: string
  title?: string
  description?: string
  status: 'draft' | 'open' | 'closed'
}

export interface OfferFields extends FieldSet {
  Code: number
  From: string[]
  Editor: string[]
  Category: string
  Subcategory: string
  Title: string
  Description: string
}

export type OfferRecord = Record<OfferFields>

export interface Person extends Resource {
  [key: string]: any
  phone: string
  name?: string
  offers?: string[]
  editing?: string[]
  editingField?: string | null
}

export interface PersonFields extends FieldSet {
  Phone: string
  Name: string
  Offers: string[]
  Editing: string[]
}

export type PersonRecord = Record<PersonFields>
