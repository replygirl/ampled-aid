import type { TwilioSmsMessage } from '../_types'
import twilio from './twilio'

export default ({ from }: TwilioSmsMessage, to: string, body: string) =>
  twilio.messages.create({ body, from, to })
