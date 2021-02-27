<template lang="pug">
.flex-col.space-y-2
  legend.f-h6(v-if="props.legend") {{ props.legend }}
  slot(v-bind="props")
  span(v-if="props.error") {{ props.error }}
  span(v-else-if="props.caption") {{ props.caption }}
</template>

<script setup lang="ts">
import type { Nullable } from 'nullable-ts'
import { defineProps } from 'vue'

const props = defineProps<{
  caption?: string
  disabled?: boolean
  error?: Nullable<string>
  legend?: string
  required?: boolean
}>()
</script>
