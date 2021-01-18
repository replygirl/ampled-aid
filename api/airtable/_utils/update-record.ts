import { sentenceCase } from '@replygirl/change-case-object'
import type { FieldSet, Record } from '@replygirl/airtable'
import type { Dictionary } from 'dictionary-types'

import base from './base'
import { parseRecord } from './parse-record'

const updateRecord = async <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  id: string,
  data: Partial<T>
): Promise<T> => parseRecord(
  await base<TFields>(table).update(
    id,
    sentenceCase(data) as Partial<TFields>
  )
)

export default updateRecord
