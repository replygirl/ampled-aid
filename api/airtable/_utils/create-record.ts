import type { FieldSet } from '@replygirl/airtable'
import { sentenceCase } from '@replygirl/change-case-object'
import type { Dictionary } from 'dictionary-types'

import base from './base'
import { parseRecord } from './parse-record'

const createRecord = async <
  TFields extends FieldSet,
  T extends Dictionary<any>
>(
  table: string,
  data: T
): Promise<T> =>
  parseRecord(
    await base<TFields>(table).create(
      sentenceCase(data) as Partial<TFields>
    )
  )

export default createRecord
