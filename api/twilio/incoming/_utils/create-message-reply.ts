import type { TwilioSmsMessage } from '../_types'
import twilio from './twilio'

export default ({ from, to }: TwilioSmsMessage, body: string) =>
  twilio.messages.create({
    body,
    from: to,
    to: from
  })
