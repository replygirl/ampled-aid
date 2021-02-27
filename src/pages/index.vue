<template lang="pug">
main.layout-stack
  Hero(title="Sharing is caring")
  nav.grid.grid-cols-2.gap-2
    button.col-span-2 Browse offers
    router-link.button(to="/offers/new") Post an offer
    button Edit an offer
</template>

<style lang="postcss">
html { @apply bg-v }
</style>
