import type { Person } from '../../../airtable/_types'
import { findOffer } from '../../../airtable/_utils'
import { menu } from '../_schema'
import type { TwilioSmsMessage } from '../_types'
import createMessageReply from './create-message-reply'

const showEditMenu = async (
  msg: TwilioSmsMessage,
  { id: personId, offers: offerIds = [] }: Person
) => {
  const offerId = /^EDIT(?: (\d+))?$/.exec(msg.body)?.[1]

  await createMessageReply(msg, !!offerId
    ? menu
    : (await Promise.all(offerIds.map(x => findOffer(x))))
      .map(({ code, title }) => `[${code}]: ${title}`)
      .join('\n')
  )

  return [personId, offerId]
}

export default showEditMenu
