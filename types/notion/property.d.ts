import type { PascalCase } from 'type-fest'

import type { Inline } from './inline'
import type { Person } from './person'
import type { SelectOption } from './select'

export type PropType =
  | 'title'
  | 'text'
  | 'url'
  | 'checkbox'
  | 'select'
  | 'multi_select'
  | 'number'
  | 'formula'
  | 'date'
  | 'relation'
  | 'rollup'
  | 'people'
  | 'files'
  | 'phone_number'

interface PropBase {
  type: PropType
}

interface PropTitle extends PropBase {
  type: 'title'
  title?: {}
}
interface PropText extends PropBase {
  type: 'text'
  text?: {}
}
interface PropUrl extends PropBase {
  type: 'url'
  text?: {}
}
interface PropCheckbox extends PropBase {
  type: 'checkbox'
  checkbox?: {}
}
interface PropSelect extends PropBase {
  type: 'select'
  select?: {
    options?: SelectOption[]
  }
}
interface PropMultiSelect extends PropBase {
  type: 'multi_select'
  multiSelect?: {
    options?: SelectOption[]
  }
}
interface PropNumber extends PropBase {
  type: 'number'
  number?: {
    format?: 'dollar' | string | null
  }
}
interface PropFormula extends PropBase {
  type: 'formula'
  formula?: {
    value?: string | null
  }
}
interface PropDate extends PropBase {
  type: 'date'
  date?: {}
}
interface PropRelation extends PropBase {
  type: 'relation'
  relation?: {
    database?: string | null
    syncedPropertyName?: string | null
  }
}
interface PropRollup extends PropBase {
  type: 'rollup'
  rollup?: {
    rollupPropertyName?: string | null
    relationPropertyName?: string | null
    rollupPropertyId?: string | null
    relationPropertyId?: string | null
    function: 'count' | string | null
  }
}
interface PropPeople extends PropBase {
  type: 'people'
  people?: {}
}
interface PropFiles extends PropBase {
  type: 'files'
  files?: {}
}
interface PropPhoneNumber extends PropBase {
  type: 'phone_number'
  phoneNumber?: {}
}

export type Prop =
  | PropTitle
  | PropText
  | PropUrl
  | PropCheckbox
  | PropSelect
  | PropMultiSelect
  | PropNumber
  | PropFormula
  | PropDate
  | PropRelation
  | PropRollup
  | PropPeople
  | PropFiles
  | PropPhoneNumber

export interface PropValueTitle extends PropBase {
  type: 'title'
  title?: Inline[]
}
export interface PropValueText extends PropBase {
  type: 'text'
  text?: Inline[]
}
export interface PropValueUrl extends PropBase {
  type: 'url'
  url?: string | null
}
export interface PropValueCheckbox extends PropBase {
  type: 'checkbox'
  checkbox?: boolean
}
export interface PropValueSelect extends PropBase {
  type: 'select'
  select?: SelectOption
}
export interface PropValueMultiSelect extends PropBase {
  type: 'multi_select'
  multiSelect?: SelectOption[]
}
export interface PropValueNumber extends PropBase {
  type: 'number'
  number?: number
}
export interface PropValueFormula extends PropBase {
  type: 'formula'
  formula?: {
    type?: 'number' | 'boolean' | 'string' | 'date' | string
    [key: string]: number | boolean | string | Date | any
  }
}
export interface PropValueDate extends PropBase {
  type: 'date'
  date?: {
    start: string | null
    end: string | null
  }
}
export interface PropValueRelation extends PropBase {
  type: 'relation'
  relation?: {
    id: string
  }[]
}
export interface PropValueRollup extends PropBase {
  type: 'rollup'
  rollup?: {
    rollupPropertyName?: string | null
    relationPropertyName?: string | null
    rollupPropertyId?: string | null
    relationPropertyId?: string | null
    function: 'count' | string | null
  }
}
export interface PropValuePeople extends PropBase {
  type: 'people'
  people?: Person[]
}
export interface PropValueFiles extends PropBase {
  type: 'files'
  files?: { name: string }[]
}
export interface PropValuePhoneNumber extends PropBase {
  type: 'phone_number'
  phoneNumber?: string | null
}

export type PropValue =
  | PropValueTitle
  | PropValueText
  | PropValueUrl
  | PropValueCheckbox
  | PropValueSelect
  | PropValueMultiSelect
  | PropValueNumber
  | PropValueFormula
  | PropValueDate
  | PropValueRelation
  | PropValueRollup
  | PropValuePeople
  | PropValueFiles
  | PropValuePhoneNumber
