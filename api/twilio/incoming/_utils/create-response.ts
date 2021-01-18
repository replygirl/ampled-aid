import type { TwilioSmsMessage } from '../_types'
import { findPerson, findOffer } from '../../../airtable/_utils'
import createMessage from './create-message'
import createMessageReply from './create-message-reply'

const createResponse = async (msg: TwilioSmsMessage) => {
  const [_, respondToId, response] = /^RESPOND (\d+) (.+)$/.exec(msg.body) ?? []

  const { from: [toId], title } = await findOffer(respondToId)
  const { phone: toPhone } = await findPerson(toId)

  return Promise.all([
    createMessage(msg, toPhone,
      `New response to ${title} from ${msg.from}: ${response}`
    ),
    createMessageReply(msg, 'Your response has been sent. Keep an eye out 👁'),
  ])
}

export default createResponse
