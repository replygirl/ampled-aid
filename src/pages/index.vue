<template lang="pug">
main.layout-stack
  Hero(title="Sharing is caring")
  nav.grid.grid-cols-2.gap-2
    router-link.button.col-span-2(to="/offers") Browse offers
    router-link.button(disabled to="/offers/new") Post an offer
    router-link.button(disabled) Edit an offer
</template>

<style lang="postcss">
html { @apply bg-v }
</style>
