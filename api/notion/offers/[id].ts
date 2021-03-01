import type { VercelRequest, VercelResponse } from '@vercel/node'

import { cors, fetchPage } from '../../_utils'

export default async (req: VercelRequest, res: VercelResponse) => {
  cors(res, 'get')

  res.send(await fetchPage(req.query.id as string))
}
