import { findRecord } from '.'
import type { Person, PersonFields } from '../_types'

export default (id: string) => findRecord<PersonFields, Person>('People', id)
