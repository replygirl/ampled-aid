<template lang="pug">
.flex-col.space-y-2
  label.f-h6(
    v-if="props.label"
    :for="id"
  ) {{ props.label }}
  input(
    v-bind="{ ...props, id }"
    v-mask="type === 'tel' ? '(###) ###-####' : null"
    v-model="value"
  )
  span(v-if="props.error") {{ props.error }}
  span(v-else-if="props.caption") {{ props.caption }}
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Nullable } from 'nullable-ts'
import { defineProps, defineEmit } from 'vue'

import { useId, useModelKey } from '/@/utils'

const props = defineProps<{
  caption?: string
  disabled?: boolean
  error?: Nullable<string>
  label?: string
  modelValue?: Nullable<number | string | FileList>
  name: string
  required?: boolean
  type: 'file' | 'number' | 'tel' | 'text' | 'url'
  value?: Nullable<number | string | FileList>

  // file
  accept?: string
  multiple?: boolean

  // number
  min?: number
  max?: number
  step?: number

  // tel, text
  pattern?: string

  // tel, text, url
  minLength?: number
  maxLength?: number
  placeholder?: string
}>()

const id = useId()

const emit = defineEmit()
const value = useVModel(props, useModelKey(props, 'value'), emit)
</script>
