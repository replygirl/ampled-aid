import { camelCase, snakeCase } from '@replygirl/change-case-object'

import type { Page, PageRecord, Timestamps } from '/?'

import notion from './notion'
import { pageToRecord, recordToPage } from './transform'

// export const updatePage = async <
//   T extends Timestamps = Timestamps,
//   Pg extends Page<T> = Page<T>
// >(
//   x: Partial<T> & Identifiable
// ): Promise<Partial<T>> => {
//   const { id, properties } = recordToPage<Partial<T>>(x)
//   const { data } = await notion.post<Pg>(`/pages/${id}`, snakeCase({ properties }))

//   return pageToRecord<T>(camelCase(data))
// }

export const fetchPage = async <
  T extends Timestamps = Timestamps & Record<string, any>
>(
  id: string,
  fetch = true
): Promise<PageRecord<T>> => {
  const { data } = await notion.get<Page<T>>(`/pages/${id}`)

  return pageToRecord<T>(camelCase(data), fetch)
}
