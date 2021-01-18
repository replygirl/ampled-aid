import { getTable } from '../../../airtable/_utils'
import type { Person, PersonFields } from '../../../airtable/_types'
import type { TwilioSmsMessage } from '../_types'

export default async ({ from }: TwilioSmsMessage) => {
  console.log('finding person')

  const { items: [person] } = await getTable<PersonFields, Person>('People', {
    filterByFormula: `Phone = '${from}')`
  })

  console.log('found person')

  return person
}
