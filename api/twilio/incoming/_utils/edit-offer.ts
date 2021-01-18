import { Dictionary } from 'dictionary-types'

import type { Offer } from '../../../airtable/_types'
import { findOffer, updateOffer, updatePerson } from '../../../airtable/_utils'
import type { TwilioSmsMessage } from '../_types'
import createMessageReply from './create-message-reply'

interface ActionBase {
  name: keyof Offer & string
  type: 'string' | 'text' | 'select' | 'selectChild'
  question?: string
  selectOptions?: Dictionary<string>
  selectParent?: keyof Offer
  selectRoutes?: Dictionary<{
    question: string
    selectOptions: Dictionary<string>
  }>
}

interface ActionString extends ActionBase {
  type: 'string' | 'text'
  question: string
}

interface ActionSelectRoot extends ActionBase {
  type: 'select'
  question: string
  selectOptions: Dictionary<string>
}

interface ActionSelectChild extends ActionBase {
  type: 'selectChild'
  selectParent?: keyof Offer
  selectRoutes?: Dictionary<{
    question: string
    selectOptions: Dictionary<string>
  }>
}

type ActionSelect = ActionSelectRoot | ActionSelectChild

type Action = ActionString | ActionSelect

const actions: Dictionary<Action> = {
  c: {
    name: 'category',
    question: 'What category of thing are you offering?',
    type: 'select',
    selectOptions: {
      g: 'gear',
      s: 'services'
    }
  },
  s: {
    name: 'subcategory',
    type: 'selectChild',
    selectParent: 'category',
    selectRoutes: {
      gear: {
        question: 'What kind of gear?',
        selectOptions: {
          c: 'controller',
          i: 'instrument',
          e: 'effects'
        }
      },
      services: {
        question: 'What kind of service?',
        selectOptions: {
          mix: 'mixing',
          mas: 'mastering'
        }
      }
    }
  },
  t: {
    name: 'title',
    question: 'Give your offer a short title:',
    type: 'string'
  },
  d: {
    name: 'description',
    question: 'Describe in detail:',
    type: 'text'
  }
}

const menu = `Select a field to edit:${
  Object.entries(actions).map(([k, { name }]) => `\n[${k}]: ${name}`)
}\n\nSend DONE to close the editor, or CLOSE to mark the offer as expired`

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
        'Come back any time to edit and publish your offer'
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
        console.log('will assign')
        console.log(type, ['string', 'text'].includes(type), body)
        try {
          Object.assign(offer, await updateOffer(id, {
            [field]: ['string', 'text'].includes(type)
              ? body
              : type === 'select'
                ? selectOptions[body]
                : type === 'selectChild'
                  ? selectRoutes[offer[selectParent]].selectOptions[body]
                  : body
          }))
        } catch (e) { console.error(e) }
      }

      console.log('assigned')

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
