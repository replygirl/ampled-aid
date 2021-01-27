import type { TwilioSmsMessage } from '../_types'
import twilio from './twilio'

export default ({ to: from }: TwilioSmsMessage, to: string, body: string) =>
  twilio.messages.create({ body, from, to })
