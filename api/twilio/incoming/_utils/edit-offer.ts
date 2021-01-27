import type { Offer } from '../../../airtable/_types'
import { findOffer, updateOffer } from '../../../airtable/_utils'
import { actions, menu } from '../_schema'
import type { Action, ActionString, TwilioSmsMessage } from '../_types'
import createMessageReply from './create-message-reply'

const editOffer = async (
  msg: TwilioSmsMessage,
  id: string,
  field?: string | null
) => {
  const { body } = msg

  const offer: Offer = await findOffer(id)
  let editing: string | true | null = field ?? null

  switch (body) {
    case 'LATER':
      await createMessageReply(msg,
        `Text EDIT ${offer.code} to make changes later. Don't forget!!`
      )
      editing = null
      break
    case 'PUBLISH':
      Object.assign(offer, await updateOffer(id, { status: 'open' }))
      await createMessageReply(msg,
        `🎉 Your offer is now live! You'll get texts when people are interested. Send EDIT to update, CLOSE to expire, or OFFER to post more`
      )
      editing = null
      break
    case 'DONE':
      await createMessageReply(msg, '💤')
      editing = null
      break
    case 'CLOSE':
      Object.assign(offer, await updateOffer(id, { status: 'closed' }))
      await createMessageReply(msg,
        'Your offer is no longer live. You can reopen it at any time by editing it again'
      )
      editing = null
      break
    default:
      if (field) {
        const {
          type,
          selectOptions = {},
          selectParent = '',
          selectRoutes = {}
        } = Object.values(actions).find(x => x.name === field) as Action
        Object.assign(offer, await updateOffer(id, {
          [field]: ['string', 'text'].includes(type)
            ? body
            : type === 'select'
              ? selectOptions[body]
              : type === 'selectChild'
                ? selectRoutes[offer[selectParent as keyof Offer]]
                  .selectOptions[body]
                : body
        }))
      }

      const nextActionKey: string | true | null =
        (!field && (Object.keys(actions).includes(body)))
          ? body
          : offer
            ? Object.keys(actions).find(k => !offer[actions[k].name]) ?? true
            : null

      editing = typeof nextActionKey === 'string'
        ? actions[nextActionKey].name
        : nextActionKey

      if (typeof nextActionKey === 'string') {
        const a = actions[nextActionKey]
        await createMessageReply(msg,
          ['string', 'text'].includes(a.type)
            ? (a as ActionString).question
            : a.type === 'select'
              ? `${a.question}:${
                  Object.entries(a.selectOptions).map(([k, v]) =>
                    `\n[${k}]: ${v}`
                  )
                }`
              : a.type === 'selectChild'
                ? `${
                  a.selectRoutes
                    ?.[offer[a.selectParent as keyof Offer]]
                    .question
                }:${
                  Object.entries(
                    a.selectRoutes
                      ?.[offer[a.selectParent as keyof Offer]]
                      .selectOptions
                      ?? {}
                  ).map(([k, v]) => `\n[${k}]: ${v}`)
                }`
                : 'something is wrong'
        )
      } else await createMessageReply(msg, offer.status === 'draft'
        ? 'All set! Send PUBLISH to post, or LATER to save as a draft'
        : menu
      )
  }

  return { editing, offer }
}

export default editOffer
