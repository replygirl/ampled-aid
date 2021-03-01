import createService from '@replygirl/vanity'
import type { ValueOf } from 'type-fest'

import type { Offer, PageRecord } from '/?'

import api from './api'

type State = {
  offers: Record<string, PageRecord<Offer>> | null
}

export default createService<
  State,
  {
    byId: (
      k: keyof State,
      id: string
    ) => ValueOf<Exclude<ValueOf<State>, null>> | null
    fetch: (
      k: keyof State,
      id: string
    ) => Promise<ValueOf<Exclude<ValueOf<State>, null>>>
    fetchAll: (k: keyof State) => Promise<Exclude<ValueOf<State>, null>>
    offersWithTags: (labels: string[]) => PageRecord<Offer>[]
    reset: () => void
  }
>({
  name: 'offers',
  baseState: {
    offers: {}
  },
  methods: ({ clear, commit, state }) => ({
    byId(k: keyof State, id: string) {
      return state[k]?.[id] ?? null
    },
    async fetch(k: keyof State, id: string) {
      const [r, e] = await api.get(`/notion/${k}/${id}`)
      if (e) throw e

      const v: ValueOf<Exclude<ValueOf<State, typeof k>, null>> = {
        ...state[k]?.[id],
        ...r
      }

      commit({
        [k]: {
          ...state[k],
          [id]: v
        }
      })
      return v
    },
    async fetchAll(k: keyof State) {
      const [r, e] = await api.get(`/notion/${k}`)
      if (e) throw e

      const v: Exclude<ValueOf<State>, null> = {
        ...state[k],
        ...r.reduce(
          (acc: Record<string, PageRecord<Offer>>, x: PageRecord<Offer>) => ({
            ...acc,
            [x.id]: { ...state[k]?.[x.id], ...x }
          }),
          {}
        )
      }

      commit({ [k]: v })
      return v
    },
    offersWithTags: (labels: string[]) =>
      Object.values(state.offers ?? {}).filter(x =>
        labels.every(k =>
          x.tags?.map(x => x.split(' ').slice(1).join(' ')).includes(k)
        )
      ),
    reset() {
      clear()
    }
  })
})
