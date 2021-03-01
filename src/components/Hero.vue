<template lang="pug">
header.text-center.sm--p-8
  p(v-if="props.preamble") {{ props.preamble }}
  h2.f-h1 {{ props.title }}
  p(v-if="props.subtitle") {{ props.subtitle }}
  slot
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  preamble?: string
  title: string
  subtitle?: string
}>()
</script>
