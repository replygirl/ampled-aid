import type { FieldSet } from 'airtable'
import type { QueryParams } from 'airtable/lib/query_params'
import type { Dictionary } from 'dictionary-types'

import base from './base'
import parseRecord from './parse-record'

const getTable = <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  {
    filterByFormula,
    view = 'Grid view'
  }: QueryParams<TFields> = {}
) => new Promise<{ items: T[] }>((resolve, reject) => {
  const items: T[] = []

  base<TFields>(table)
    .select({ filterByFormula, view })
    .eachPage(
      (records, next) => {
        items.push(...records.map(x => parseRecord<TFields, T>(x)))
        next()
      },
      error => {
        if (error) reject(error)
        resolve({ items })
      }
    )
})

export default getTable
