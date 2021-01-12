import type { Offer } from '../../../airtable/_types'

const fields: {
  name: keyof Offer
  question: string
}[] = [
  {
    name: 'category',
    question: 'category?'
  },
  {
    name: 'type',
    question: 'type?'
  },
  {
    name: 'name',
    question: 'name?'
  },
  {
    name: 'description',
    question: 'description?'
  }
]

export default (offer: Offer) => {
  const field = fields.find(({ name }) => offer[name] == null)
  if (field) {}
}
