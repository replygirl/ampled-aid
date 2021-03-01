import type { CamelCase } from 'type-fest'

import type { Obj } from './core'
import type { Inline } from './inline'
import type { Prop, PropType } from './property'

export interface Db<P = Prop> extends Obj {
  object: 'database'
  title: Inline[]
  properties: Record<string, P>
}

export type DbFilterOperand<K = string> = Partial<
  Record<PropType, Record<string, string | number | boolean | null>>
> & {
  property: K
}

export type DbFilter<K = string> =
  | DbFilterOperand<K>
  | {
      and: (DbFilterOperand<K> | DbFilter<K>)[]
    }
  | {
      or: (DbFilterOperand<K> | DbFilter<K>)[]
    }

export interface DbQuery<T = any> {
  filter?: DbFilter<keyof T>
  sorts?: {
    property: keyof T
    direction: 'ascending' | 'descending'
  }[]
}
