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

export interface ActionBase {
  name: keyof Offer & string
  type: 'string' | 'text' | 'select' | 'selectChild'
  question?: string
  selectOptions?: Dictionary<string>
  selectParent?: keyof Offer
  selectRoutes?: Dictionary<{
    question: string
    selectOptions: Dictionary<string>
  }>
}

export interface ActionString extends ActionBase {
  type: 'string' | 'text'
  question: string
}

export interface ActionSelectRoot extends ActionBase {
  type: 'select'
  question: string
  selectOptions: Dictionary<string>
}

export interface ActionSelectChild extends ActionBase {
  type: 'selectChild'
  selectParent?: keyof Offer
  selectRoutes?: Dictionary<{
    question: string
    selectOptions: Dictionary<string>
  }>
}

export type ActionSelect = ActionSelectRoot | ActionSelectChild

export type Action = ActionString | ActionSelect
