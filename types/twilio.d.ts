import type { NowRequest } from '@vercel/node'
import type { PascalCase } from 'type-fest'

type TwilioSmsMessageKey =
  | 'accountSid'
  | 'apiVersion'
  | 'body'
  | 'from'
  | 'fromCity'
  | 'fromCountry'
  | 'fromState'
  | 'fromZip'
  | 'messageSid'
  | 'numMedia'
  | 'numSegments'
  | 'smsMessageSid'
  | 'smsSid'
  | 'smsStatus'
  | 'to'
  | 'toCity'
  | 'toCountry'
  | 'toState'
  | 'toZip'

export type TwilioSmsMessage = Record<TwilioSmsMessageKey, string>

export interface NowRequestTwilioSms extends NowRequest {
  body: Record<PascalCase<TwilioSmsMessageKey>, string>
}
