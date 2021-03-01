<template lang="pug">
main.layout-stack
  Hero(title="Offers")
  .flex.flex-wrap.justify-center.space-x-2
    .chip.mb-2.flex-shrink-0.relative.cursor-pointer(
      v-for="[emoji, label] in tags" :key="label"
      :class="[filter.tags.includes(label) ? 'active' : 'inactive']"
      @click="onTagClicked(label)"
    )
      span.absolute.-top-2.-left-2.f-h1 {{ emoji }}
      span.pl-2 {{ label }}
  ul.flex-1.space-y-4.lg--space-y-0.lg--grid.lg--grid-cols-2.lg--gap-4.lg--place-items-stretch.2xl--grid-cols-3(v-if="offers")
    li(v-for="offer in offers" :key="offer.id")
      router-link(:to="`/offers/${offer.id}`")
        ItemOffer(v-bind="{ offer }")
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

import { notion } from '/@/services'


const offers = computed(() => filter.tags.length
  ? notion.offersWithTags(filter.tags)
  : Object.values(notion.offers ?? {})
)

const tags = computed(() => Object.values(notion.offers ?? {})
  .reduce((acc: string[], x) => [
    ...acc,
    ...x.tags?.filter(x => !acc.includes(x)) ?? []
  ], [])
  .map(x => {
    const [emoji, ...label] = x.split(' ')
    return [emoji, label.join(' ')]
  })
)

const filter = reactive({
  tags: [] as string[]
})

onMounted(() => notion.fetchAll('offers'))

const onTagClicked = (label: string) =>
  filter.tags = [
    ...filter.tags.filter(x => x !== label),
    ...filter.tags.includes(label) ? [] : [label]
  ]
</script>

<style lang="postcss">
html { @apply bg-v }
</style>

<style scoped lang="postcss">
@media (min-width: 1024px) {
  .layout-stack > *:not(header) {
    width: 80%;
    max-width: 1560px;
  }
}
</style>
