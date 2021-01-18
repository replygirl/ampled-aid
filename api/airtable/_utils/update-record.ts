import { sentenceCase } from '@replygirl/change-case-object'
import type { FieldSet, Record } from '@replygirl/airtable'
import type { Dictionary } from 'dictionary-types'

import base from './base'
import { parseRecord } from './parse-record'

const updateRecord = <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  id: string,
  data: Partial<T>
) => new Promise<T>((resolve, reject) => {
  const fields: Partial<TFields> = sentenceCase(data)

  base<TFields>(table).update(
    id,
    fields,
    (error: unknown, record?: Record<TFields>) => {
      if (error) reject(error)
      resolve(parseRecord<TFields, T>(record as Record<TFields>))
    }
  )
})

export default updateRecord
