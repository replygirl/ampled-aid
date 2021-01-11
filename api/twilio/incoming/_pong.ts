import type { TwilioSmsIncoming } from './_types'

import twilio from 'twilio'

export default async ({ from, to }: TwilioSmsIncoming) => {
  const {
    TWILIO_ACCOUNT_SID: twilioAccountSid,
    TWILIO_AUTH_TOKEN: twilioAuthToken
  } = process.env

  const t = twilio(twilioAccountSid, twilioAuthToken)

  await t.messages.create({
    body: 'pong',
    from: to,
    to: from
  })
}
