import type { PropValueCheckbox, PropValueSelect } from './notion'

export type Status = 'draft' | 'pending' | 'rejected' | 'approved' | 'flagged'

export interface Meta {
  status?: Status | null
  visible?: boolean
  public?: boolean
}

export interface MetaProps {
  status?: PropValueSelect
  visible?: PropValueCheckbox
  public?: PropValueCheckbox
}
