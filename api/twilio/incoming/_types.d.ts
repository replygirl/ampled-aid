import type { NowRequest } from '@vercel/node'

export interface TwilioSmsIncomingRequest extends NowRequest {
  body: {
    messageSid: string
    smsSid: string
    accountSid: string
    messagingServiceSid: string
    from: string
    to: string
    body: string
  }
}
