import axios from 'axios'

const {
  NOTION_API_TOKEN: apiToken,
  NOTION_API_VERSION: apiVersion,
  NOTION_DATABASE_USERS_ID: dbUsersId
} = process.env as Record<string, string>

export default axios.create({
  baseURL: `https://api.notion.com/v${apiVersion ?? 1}`,
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  }
})
