import type { TwilioSmsMessage } from '../_types'
import createMessageReply from './create-message-reply'

export default (msg: TwilioSmsMessage) => createMessageReply(msg, 'pong')
