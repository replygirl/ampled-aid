<template lang="pug">
main.layout-stack
  Hero(
    title="New offer"
    subtitle="Thanks in advance"
  )
  FormOffer(v-model="offer" @submit="onSubmit")
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Offer } from '/@/types'

const offer = ref<Offer>({
  categoryPrimary: null,
  categorySecondary: null,
  description: '',
  phoneNumber: '',
  title: ''
})

const onSubmit = () => {}
</script>

<style lang="postcss">
html { @apply bg-g }
</style>
