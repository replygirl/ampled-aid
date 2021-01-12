import { camelCase } from '@replygirl/change-case-object'
import type { FieldSet } from 'airtable'
import type { Dictionary } from 'dictionary-types'

import base from './base'

const getTable = <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  { view = 'Grid view' } = {}
) => new Promise<{ items: T[] }>((resolve, reject) => {
  const items: T[] = []

  base<TFields>(table)
    .select({ view })
    .eachPage(
      (records, next) => {
        items.push(...records.map(({ _rawJson: { id, fields } }) => ({
          id,
          ...camelCase(fields)
        })))
        next()
      },
      error => {
        if (error) reject(error)
        resolve({ items })
      }
    )
})

export default getTable
