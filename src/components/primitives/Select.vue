<template lang="pug">
.flex-col.space-y-2
  label.f-h6(
    v-if="props.label"
    :for="id"
  ) {{ props.label }}
  select(
    v-bind="{ ...props, id }"
    @input="value = $event.target.value"
  )
    option(:value="null" placeholder) {{ props.placeholder ?? '' }}
    option(
      v-for="(x, i) in options"
      :key="`${id}-option-${x?.id ?? x?.name ?? x?.[1] ?? x}`"
      :selected="x === props.value"
      :value="x?.value ?? x"
    ) {{ x?.label ?? x?.name ?? x }}
  span(v-if="props.error") {{ props.error }}
  span(v-else-if="props.caption") {{ props.caption }}
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { defineEmit, defineProps } from 'vue'

import { useId, useModelKey } from '/@/utils'

const props = defineProps<{
  caption?: string
  disabled?: boolean
  error?: string | null
  label?: string
  modelValue?: any
  name: string
  options: any[]
  placeholder?: string
  required?: boolean
  value?: any
}>()

const id = useId()

const emit = defineEmit()
const value = useVModel(props, useModelKey(props, 'value'), emit)
</script>
