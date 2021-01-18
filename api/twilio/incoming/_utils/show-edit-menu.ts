import type { Dictionary } from 'dictionary-types'

import type { Offer, Person } from '../../../airtable/_types'
import { findOffer } from '../../../airtable/_utils'
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
