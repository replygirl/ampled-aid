<template lang="pug">
header.relative.px-4.border-b-px.bg-w
  a.logo.block.h-full(href="https://ampled.com") Ampled
  router-link.absolute.right-4.transform.f-h6(
    v-if="$route.path !== '/offers'"
    class="top-1/2 -translate-y-1/2 sm--right-1/2 sm--translate-x-1/2"
    to="/offers"
  ) Market
</template>

<style scoped lang="postcss">
header {
  height: 50px
}

.logo {
  @apply text-transparent bg-no-repeat;
  background-image: url(/@/assets/images/ampled-logo.svg);
}
</style>
