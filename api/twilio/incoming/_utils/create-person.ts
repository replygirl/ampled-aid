import { createRecord } from '../../../airtable/_utils'
import type { Person, PersonFields } from '../../../airtable/_types'
import type { TwilioSmsMessage } from '../_types'

export default async ({ from }: TwilioSmsMessage) =>
  await createRecord<PersonFields, Person>('People', { phone: from })
