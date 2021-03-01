import type { Identifiable, Obj, Timestamps } from './core'
import type { PropValue } from './property'

export interface Page<T extends Record<string, any>> extends Obj, Timestamps {
  object: 'page'
  parent: {
    type: 'database_id'
    databaseId: string
  }
  archived: boolean
  properties: Partial<Record<keyof PageRecord<T>, PropValue>>
}

export type PageRecord<T> = Identifiable &
  Timestamps &
  T & {
    archived: boolean
    db: string
  }
