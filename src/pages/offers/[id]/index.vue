<template lang="pug">
main.layout-stack
  Hero.sm---mb-8(:title="offer.name")
    .mt-8.flex-col.items-center.space-y-4
      .chip.relative.flex.items-baseline.space-x-2
        span.absolute.-top-4.text-k.transform(class="left-1/2 -translate-x-1/2") from
        span.f-h6(v-if="owner.handle") {{ owner.handle }}
        i(v-if="owner.rollHandle") ${{ owner.rollHandle }}
      .flex.justify-center.items-baseline.space-x-2(v-if="tags")
        .chip.relative(v-for="[emoji, label] in tags" :key="label")
          span.absolute.-top-2.-left-2.f-h1 {{ emoji }}
          span.pl-2 {{ label }}
  section.flex-col
    .p-4.space-y-2.border.bg-w.text-center(:class="{ 'border-b-0': offer.url }")
      h5.f-h5 {{ descriptionHeading }}
      p.f-subtitle {{ offer.description }}
    a.button.flex.justify-center.items-center.space-x-2(
      v-if="offer.url"
      :href="offer.url"
      @click.stop
    )
      span More info
      mdi-launch
  section.p-4.bg-k.text-w.text-center.space-y-4
    div
      .f-h6 What's this?
      p This is where services, discounts, and other offers are shared on Ampled. When someone redeems your offer, we give you $AMPLED to use here or elsewhere on Ampled.
    div
      .f-h6 What's $AMPLED?
      p
        | $AMPLED is the Ampled $. We're working with &#32;
        a(href="https://seedclub.xyz/") Seed Club
        | &#32;to back economic value in the Ampled ecosystem.
    div
      .f-h6 How do I post?
      p
        | We're working on letting you post offers with your Ampled account. For now, we're at hello@ampled.com
</template>

<script setup lang="ts">
import randomItem from 'random-item'
import { computed, onMounted, ref, defineProps } from 'vue'

import { notion } from '/@/services'

const props = defineProps<{
  id: string
}>()

const offer = computed(() => notion.byId('offers', props.id))
const owner = computed(() => offer.value?.owners?.[0])
const tags = computed(() => offer.value?.tags?.map(x => {
  const [emoji, ...label] = x.split(' ')
  return [emoji, label.join(' ')]
}))

const descriptionHeading = ref(randomItem([
  'ℹ️',
  '🧐',
  '🤔',
  '🤔🤔🤔🤔🤔🤔🤔🤔🤔',
  'F.Y.I.',
  'Nutrition facts',
  'Spot check',
  'The 411',
  'The hot goss',
  'The inside story',
  'The lowdown',
  'The scoop',
  'The skinny',
  'The tea',
  `What's what`,
]))

onMounted(() => notion.fetch('offers', props.id))
</script>

<style lang="postcss">
html { @apply bg-y }
</style>

<style scoped lang="postcss">
.layout-stack > *:not(header) {
  max-width: 640px;
}
</style>
