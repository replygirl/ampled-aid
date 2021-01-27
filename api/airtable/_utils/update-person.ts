import type { PersonFields, Person } from '../_types'
import updateRecord from './update-record'

export default (id: string, data: Partial<Person>) =>
  updateRecord<PersonFields, Person>('People', id, data)
