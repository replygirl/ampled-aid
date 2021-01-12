import type { TwilioSmsMessage } from '../_types'
import twilio from './twilio'

export default ({ from, to }: TwilioSmsMessage) =>
  twilio.messages.create({
    body: 'pong',
    from: to,
    to: from
  })
