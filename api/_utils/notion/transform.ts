import type {
  Page,
  PageRecord,
  PropType,
  PropValue,
  PropValueCheckbox,
  PropValueDate,
  PropValueFiles,
  PropValueFormula,
  PropValueMultiSelect,
  PropValueNumber,
  PropValuePeople,
  PropValuePhoneNumber,
  PropValueRelation,
  PropValueRollup,
  PropValueSelect,
  PropValueText,
  PropValueTitle,
  PropValueUrl
} from '/?'

import { fetchPage } from './page'

export const propValueToValue = async <T extends Record<string, any>>(
  x: PropValue,
  fetch = true
): Promise<PageRecord<T>[keyof PageRecord<T>]> => {
  const fns: Record<PropType, (x: any) => any> = {
    title: (x: PropValueTitle): string =>
      x.title?.map(y => y.plainText).join('') ?? '',
    text: (x: PropValueText): string =>
      x.text?.map(y => y.plainText).join('') ?? '',
    url: (x: PropValueUrl): string | null => x.url ?? null,
    checkbox: (x: PropValueCheckbox): boolean => x.checkbox ?? false,
    select: (x: PropValueSelect): string | null =>
      x.select?.name ?? x.select?.id ?? null,
    multi_select: (x: PropValueMultiSelect): string[] =>
      x.multiSelect?.map((x, i) => x.name ?? x.id ?? `${i}`) ?? [],
    number: (x: PropValueNumber): number | null => x.number ?? null,
    formula: (x: PropValueFormula): boolean | Date | string | number | null =>
      x.formula?.[x.formula.type!] ?? null,
    date: (x: PropValueDate): [Date | null, Date | null] => [
      x.date?.start ? new Date(x.date?.start) : null,
      x.date?.end ? new Date(x.date?.end) : null
    ],
    relation: async (x: PropValueRelation): Promise<any[]> =>
      await Promise.all(
        fetch
          ? x.relation?.map(x => x.id).map(x => fetchPage(x, false)) ?? []
          : []
      ),
    rollup: (x: PropValueRollup): any => x,
    people: (x: PropValuePeople): any => x,
    files: (x: PropValueFiles): string[] => x.files?.map(x => x.name) ?? [],
    phone_number: (x: PropValuePhoneNumber): string | null =>
      x.phoneNumber ?? null
  }

  return await fns[x.type](x)
}

export const pageToRecord = async <
  T extends Record<string, any> = Record<string, any>
>(
  {
    id,
    parent: { databaseId: db },
    archived,
    createdTime,
    lastEditedTime,
    properties
  }: Page<T>,
  fetch = true
) => {
  const x: Partial<PageRecord<T>> &
    Pick<
      PageRecord<T>,
      'id' | 'db' | 'archived' | 'createdTime' | 'lastEditedTime'
    > = {
    id,
    db,
    archived,
    createdTime,
    lastEditedTime,
    ...(
      await Promise.all(
        Object.entries(properties).map(async ([k, v]) => [
          k,
          await propValueToValue<T>(v!, fetch)
        ])
      )
    ).reduce((acc: Partial<PageRecord<T>>, [k, v]) => ({ ...acc, [k]: v }), {})
  }

  return x
}

export const recordToPage = async <T extends Record<string, any>>(
  {
    id,
    db: databaseId,
    archived,
    createdTime,
    lastEditedTime,
    ...properties
  }: PageRecord<T>,
  transformer: (
    x: Omit<
      PageRecord<T>,
      'id' | 'db' | 'archived' | 'createdTime' | 'lastEditedTime'
    >
  ) => Page<T>['properties']
): Promise<Page<T>> => ({
  id,
  object: 'page',
  parent: {
    type: 'database_id',
    databaseId
  },
  archived,
  createdTime,
  lastEditedTime,
  properties: transformer(properties)
})
