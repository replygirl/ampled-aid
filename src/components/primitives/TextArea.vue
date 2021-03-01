<template lang="pug">
.flex-col.space-y-2
  label.f-h6(
    v-if="props.label"
    :for="id"
  ) {{ props.label }}
  textarea.outline-none(
    ref="textArea"
    :style="{ height: textAreaHeight ? `${textAreaHeight}px` : 'initial' }"
    v-bind="{ ...props, id }"
    @input="value = $event.target.value"
  )
  span(v-if="props.error") {{ props.error }}
  span(v-else-if="props.caption") {{ props.caption }}
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  onBeforeUnmount,
  ref,
  watch,
  watchEffect,
  defineEmit,
  defineProps
} from 'vue'

import { useId, useModelKey } from '/@/utils'

const props = defineProps<{
  caption?: string
  disabled?: boolean
  error?: string | null
  label?: string
  maxLength?: number
  modelValue?: string | null
  name: string
  placeholder?: string
  required?: boolean
  value?: string | null
}>()

const id = useId()

const emit = defineEmit()
const value = useVModel(props, useModelKey(props, 'value'), emit)

const textArea = ref<HTMLTextAreaElement | null>(null)

const textAreaHeight = ref<number>(0)

const setTextAreaHeight = () => {
  if (!textArea.value) return
  const { clientHeight, offsetHeight, scrollHeight } = textArea.value
  textAreaHeight.value = scrollHeight + (offsetHeight - clientHeight)
}

const resizeObserver = new ResizeObserver(setTextAreaHeight)

watchEffect(setTextAreaHeight)
watch(textArea, (cur, prev) => !prev && cur && resizeObserver.observe(cur))
onBeforeUnmount(() => resizeObserver.disconnect())
</script>
