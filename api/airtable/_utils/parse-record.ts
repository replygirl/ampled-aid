import { camelCase } from '@replygirl/change-case-object'
import type { FieldSet, Record } from 'airtable'
import type { QueryParams } from 'airtable/lib/query_params'
import type { Dictionary } from 'dictionary-types'

export const parseRecord = <
  TFields extends FieldSet,
  T extends Dictionary<any>
>({ _rawJson: { id, fields } }: Record<TFields>): T => ({
  id,
  ...camelCase(fields)
})

export default parseRecord
