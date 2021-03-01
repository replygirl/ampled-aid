<template lang="pug">
main.layout-stack
  Hero(
    :preamble="ready ? 'Editing:' : 'Loading:'"
    :title="ready ? offer.title : `Offer #${code}`"
  )
  FormOffer(v-model="offer" @submit="onSubmit")
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

import type { Offer } from '/@/types'

const ready = false

const props = defineProps<{
  code: string
}>()

const offer = ref<Offer>({})

const onSubmit = () => {}
</script>

<style lang="postcss">
html { @apply bg-g }
</style>
