<template lang="pug">
form.flex-col.space-y-8(v-if="offer" @submit.prevent="onSubmit")
  Input(
    v-if="offer.id"
    caption="US numbers only. We won't share your number, it's used for verification and to notify you about responses"
    label="Phone number"
    name="phoneNumber"
    type="tel"
    pattern="\(\d{3}\) \d{3}-\d{4}"
    placeholder="(000) 000-0000"
    v-model="offer.phoneNumber"
  )
  Input(
    caption="We sent this to your phone to make sure it's really you"
    label="Verificaton code"
    name="phoneNumberVerificationCode"
    type="text"
    pattern="\d{6}"
    placeholder="000000"
    v-model="offer.phoneNumberVerificationCode"
  )
  FieldSet(
    legend="Category"
    v-slot="{ disabled }"
  )
    Select(
      name="categoryPrimary"
      :options="categoriesPrimary"
      placeholder="Primary"
      v-bind="{ disabled }"
      v-model="offer.categoryPrimary"
    )
    Select(
      :disabled="disabled ?? !categoriesSecondary.length"
      name="categorySecondary"
      :options="categoriesSecondary"
      placeholder="Secondary"
      v-model="offer.categorySecondary"
    )
  Input(
    label="Title"
    name="title"
    type="text"
    placeholder="Title"
    v-model="offer.title"
  )
  TextArea(
    caption="(You can post links in here if you need to)"
    label="Description"
    name="description"
    placeholder="Description"
    v-model="offer.description"
  )
  button(@click="onSubmit") {{ offer.id ? 'Update' : 'Post' }} my offer
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, ref, defineEmit, defineProps } from 'vue'
import type { WritableComputedRef } from 'vue'

import type { Offer } from '/@/types'
import { useModelKey, useModelValue } from '/@/utils'

const props = defineProps<{
  modelValue?: Offer
  offer?: Offer
}>()

const isNew = !useModelValue(props, 'offer')?.phoneNumber

const categories = {
  foo: ['foo', 'foo'],
  bar: ['bar', 'bar']
}

const categoriesPrimary = ref<keyof typeof categories[]>(
  Object.keys(categories) as unknown as keyof typeof categories[]
)

const categoriesSecondary = computed(() => !!offer.value.categoryPrimary
  ? categories[offer.value.categoryPrimary as keyof typeof categories]
  : []
)

const emit = defineEmit()
const offer = useVModel(
  props,
  useModelKey(props, 'offer'),
  emit
) as WritableComputedRef<Offer>
</script>
