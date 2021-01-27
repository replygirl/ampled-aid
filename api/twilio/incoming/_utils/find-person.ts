import { getTable } from '../../../airtable/_utils'
import type { Person, PersonFields } from '../../../airtable/_types'
import type { TwilioSmsMessage } from '../_types'

export default async ({ from }: TwilioSmsMessage) => {
  const { items: [person] } = await getTable<PersonFields, Person>('People', {
    filterByFormula: `Phone = '${from}'`
  })

  return person ?? {}
}
