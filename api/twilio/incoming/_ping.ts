import type { TwilioSmsIncomingRequest } from './_types'

import twilio from 'twilio'

export default async (
  {
    body: {
      From: from,
      To: to,
      Body: body
    }
  }: TwilioSmsIncomingRequest
) => {
  const {
    TWILIO_ACCOUNT_SID: twilioAccountSid,
    TWILIO_AUTH_TOKEN: twilioAuthToken
  } = process.env

  const t = twilio(twilioAccountSid, twilioAuthToken)

  await t.messages.create({
    body,
    from: to,
    to: from
  })
}
