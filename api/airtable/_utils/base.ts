import Airtable from 'airtable'

const {
  AIRTABLE_API_KEY: apiKey = '',
  AIRTABLE_BASE_ID: baseId = ''
} = process.env

Airtable.configure({ apiKey })

export default Airtable.base(baseId)
