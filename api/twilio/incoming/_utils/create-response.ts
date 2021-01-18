import type { TwilioSmsMessage } from '../_types'
import { findPerson, findOfferByCode } from '../../../airtable/_utils'
import createMessage from './create-message'
import createMessageReply from './create-message-reply'

const createResponse = async (msg: TwilioSmsMessage) => {
  const [_, code, response] = /^RESPOND (\d+) (.+)$/.exec(msg.body) ?? []

  const { from: [toId], title } = await findOfferByCode(code)
  const { phone: toPhone } = await findPerson(toId)

  console.log(toId, title, toPhone)

  await createMessage(msg, toPhone,
    `New response to ${title} from ${msg.from}: ${response}`
  )

  await createMessageReply(msg,
    'Your response has been sent. Keep an eye out 👁'
  )
}

export default createResponse
