import type { Dictionary } from 'dictionary-types'

import type { Action } from './_types'

export const actions: Dictionary<Action> = {
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

export const menu = `Select a field to edit:${
  Object.entries(actions).map(([k, { name }]) => `\n[${k}]: ${name}`)
}\n\nSend DONE to close the editor, or CLOSE to mark the offer as expired`
