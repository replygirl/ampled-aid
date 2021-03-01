import _twilio from 'twilio'

const {
  TWILIO_ACCOUNT_SID: twilioAccountSid,
  TWILIO_AUTH_TOKEN: twilioAuthToken
} = process.env

export const twilio = _twilio(twilioAccountSid, twilioAuthToken)

export const createMessage = (to: string, body: string) =>
  twilio.messages.create({ body, from, to })
