import type { FieldSet, Record } from 'airtable'
import type { Dictionary } from 'dictionary-types'

import base from './base'
import { parseRecord } from './parse-record'

const findRecord = <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  id: string
) => new Promise<T>((resolve, reject) =>
  base<TFields>(table).find(
    id,
    (error: unknown, record?: Record<TFields>) => {
      if (error) reject(error)
      resolve(parseRecord<TFields, T>(record as Record<TFields>))
    }
  )
)

export default findRecord
