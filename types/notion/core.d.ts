export interface Identifiable {
  id: string
}

export interface Resource extends Identifiable {
  type: 'person' | string
}

export interface Obj extends Identifiable {
  object: 'list' | 'page' | 'user' | 'database'
}

export interface Timestamps {
  createdTime: Date
  lastEditedTime: Date
}

export interface List<T extends Obj = Obj> extends Obj {
  object: 'list'
  hasMore: boolean
  nextCursor: string | null
  results: T[]
}
