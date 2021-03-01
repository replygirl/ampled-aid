import { camelCase, snakeCase } from '@replygirl/change-case-object'

import type { DbQuery, List, Page, PageRecord } from '/?'

import notion from './notion'
import { pageToRecord } from './transform'

const {
  NOTION_DATABASE_OFFERS_ID: offers,
  NOTION_DATABASE_USERS_ID: users
} = process.env as Record<string, string>

const dbs = { offers, users }

export const queryDb = async <T extends Record<string, any>>(
  db: keyof typeof dbs,
  q?: DbQuery,
  fetch = true,
  startCursor?: string
): Promise<PageRecord<T>[]> => {
  const { data } = await notion.post<DbQuery<T>>(
    `/databases/${dbs[db]}/query`,
    snakeCase(startCursor ? { ...q, startCursor } : q)
  )
  const { hasMore, nextCursor, results }: List<Page<T>> = camelCase(data)

  return await Promise.all([
    ...results.map(x => pageToRecord<T>(x, fetch)),
    ...(hasMore && nextCursor ? await queryDb<T>(db, q, fetch, nextCursor) : [])
  ])
}
