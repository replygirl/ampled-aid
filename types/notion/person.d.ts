import type { Obj, Resource } from './core'

export interface Person extends Obj, Resource {
  object: 'user'
  name: string
  avatarUrl?: string
  type: 'person'
  person: {
    email?: string
  }
}
