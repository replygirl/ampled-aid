<template lang="pug">
.relative.px-2.pt-4.sm--pb-8.border.bg-w.flex-col.space-y-2
  .absolute.top-0.right-0.flex.items-baseline.space-x-2(v-if="tags")
    .chip.relative(v-for="[emoji, label] in tags" :key="label")
      span.absolute.-top-2.-left-2.f-h1 {{ emoji }}
      span.pl-2 {{ label }}
  div.pb-2
    span.f-h5 {{ offer.name }}
    p {{ offer.description }}
  .absolute.bottom-0.inset-x-0.items-baseline.justify-between.space-x-4.hidden.sm--flex
    .chip.relative.flex.items-baseline.space-x-2
      span.absolute.left-2.-top-4.text-k from
      span.f-h6(v-if="owner.handle") {{ owner.handle }}
      i(v-if="owner.rollHandle") ${{ owner.rollHandle }}
    a.chip.items-center(
      v-if="offer.url"
      :href="offer.url"
      @click.stop
    )
      span.f-h6 More info
      mdi-launch
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import type { Offer } from '/?'

const props = defineProps<{
  offer: Offer
}>()

const offer = computed(() => props.offer)
const owner = computed(() => offer.value?.owners?.[0])
const tags = computed(() => offer.value?.tags?.map(x => {
  const [emoji, ...label] = x.split(' ')
  return [emoji, label.join(' ')]
}))
</script>
