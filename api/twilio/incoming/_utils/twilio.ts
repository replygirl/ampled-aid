import twilio from 'twilio'

const {
  TWILIO_ACCOUNT_SID: twilioAccountSid,
  TWILIO_AUTH_TOKEN: twilioAuthToken
} = process.env

export default twilio(twilioAccountSid, twilioAuthToken)
