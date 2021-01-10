import type { NowRequest, NowResponse } from '@vercel/node'

export default (_: NowRequest, res: NowResponse) => res.send('pong')
