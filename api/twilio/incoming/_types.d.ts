import type { NowRequest } from '@vercel/node'

export interface TwilioSmsIncomingRequest extends NowRequest {
  body: {
    AccountSid: string
    ApiVersion: string
    Body: string
    From: string
    FromCity: string
    FromCountry: string
    FromState: string
    FromZip: string
    MessageSid: string
    NumMedia: string,
    NumSegments: string
    SmsMessageSid: string
    SmsSid: string
    SmsStatus: string
    To: string
    ToCity: string
    ToCountry: string
    ToState: string
    ToZip: string
  }
}

export interface TwilioSmsMessage {
  accountSid: string
  apiVersion: string
  body: string
  from: string
  fromCity: string
  fromCountry: string
  fromState: string
  fromZip: string
  messageSid: string
  numMedia: string,
  numSegments: string
  smsMessageSid: string
  smsSid: string
  smsStatus: string
  to: string
  toCity: string
  toCountry: string
  toState: string
  toZip: string
}
