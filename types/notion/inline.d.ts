import type { Background, Fill } from './color'
import type { Mention } from './mention'

interface InlineBase {
  type: 'text' | 'mention' | string
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: Background | Fill
  }
  plainText: string
  href: string | null
}

export interface InlineText extends InlineBase {
  type: 'text'
  text: {
    content: string
    link: string | null
  }
}

export interface InlineMention extends InlineBase {
  type: 'mention'
  mention: Mention
}

export type Inline = InlineText | InlineMention
