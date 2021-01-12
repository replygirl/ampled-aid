import type { TwilioSmsMessage } from '../_types'
import twilio from './twilio'

export default async ({ from, to }: TwilioSmsMessage) => {
  const conversation = await twilio.conversations.conversations.create()

  await Promise.all([from, to].map(address =>
    conversation.participants().create({ messagingBinding: { address } })
  ))
}
