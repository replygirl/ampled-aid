<template lang="pug">
Header.flex-shrink-0
router-view.flex-1
Footer.flex-shrink-0
</template>

<style lang="postcss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

html {
  @apply h-full f-body;

  &, & body {
    @apply flex;

    & > * { @apply flex-1 }
  }
}

#app { @apply flex-col }

.layout-stack {
  @apply flex-col justify-center items-center px-4 py-8 space-y-8 sm--px-8;

  & > * { @apply w-full max-w-88 }
}

.chunk { @apply px-2 py-1 border bg-w }

.button, button { @apply chunk text-center }

input {
  &[type='tel'], &[type='text'], &[type='url'] {
    @apply chunk outline-none;

    &::placeholder { @apply opacity-25 text-current }
  }
}

textarea {
  @apply chunk outline-none resize-none;

  &::placeholder { @apply opacity-25 text-current }
}

select {
  @apply chunk pr-8 appearance-none outline-none bg-no-repeat;
  background-image: url('https://api.iconify.design/mdi/menu-down.svg?height=24');
  background-position: right 4px center;
}

.screen-reader {
  @apply absolute border-none overflow-hidden w-px h-px -m-px p-0 whitespace-nowrap;

  clip: rect(0 0 0 0);
}

.flex-col { @apply flex }

.f-h1 { @apply font-sans text-5xl font-bold uppercase tracking-widest }
.f-h2 { @apply font-sans text-4xl font-bold uppercase tracking-wider }
.f-h3 { @apply font-sans text-3xl font-bold uppercase }
.f-h4 { @apply font-sans text-3xl font-bold }
.f-h5 { @apply font-sans text-2xl font-bold }
.f-h6 { @apply font-sans text-lg font-bold uppercase }
.f-subtitle { @apply font-mono text-xl }
.f-body { @apply font-mono text-lg }
.f-caption { @apply font-mono text-base }
.f-header { @apply font-sans text-sm font-bold }
.f-button { @apply font-sans text-base font-bold uppercase }

@font-face {
  font-family: 'Replica';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/ReplicaLLWebTrial-LightTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: italic;
  font-weight: 300;
  src: url('/fonts/ReplicaLLWebTrial-LightItalicTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/ReplicaLLWebTrial-RegularTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: italic;
  font-weight: 400;
  src: url('/fonts/ReplicaLLWebTrial-ItalicTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/ReplicaLLWebTrial-BoldTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: italic;
  font-weight: 700;
  src: url('/fonts/ReplicaLLWebTrial-BoldItalicTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: normal;
  font-weight: 900;
  src: url('/fonts/ReplicaLLWebTrial-HeavyTrial.woff') format('woff');
}

@font-face {
  font-family: 'Replica';
  font-style: italic;
  font-weight: 900;
  src: url('/fonts/ReplicaLLWebTrial-HeavyItalicTrial.woff') format('woff');
}
</style>
