import type { Person, PersonFields } from '../_types'
import findRecord from './find-record'

export default (id: string) => findRecord<PersonFields, Person>('People', id)
