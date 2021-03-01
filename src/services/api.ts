import axios from 'axios'
import tc from '@replygirl/tc'
import createService from '@replygirl/vanity'

const api = axios.create({
  // @ts-ignore vite env sugar
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default createService({
  name: 'api',
  baseState: {},
  methods: () => ({
    async get(url: string) {
      const [{ data = null } = {}, e] = await tc(() => api.get(url))

      return [data, e]
    }
  })
})
