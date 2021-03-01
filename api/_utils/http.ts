import type { VercelResponse } from '@vercel/node'
import { constantCase } from 'change-case'

export const cors = (res: VercelResponse, headers?: string | string[]) => {
  if (process.env.VERCEL_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Credentials', 1)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      [
        'options',
        ...(headers ? (Array.isArray(headers) ? headers : [headers]) : [])
      ]
        .map(x => constantCase(x))
        .join()
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
  }
}
