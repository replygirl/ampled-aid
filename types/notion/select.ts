import type { Fill } from './color'

export interface SelectOption<K = string> {
  id: string
  name: K
  color: Fill
}
