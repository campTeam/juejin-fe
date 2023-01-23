<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: false,
    default: '',
  },
  inSite: {
    type: Boolean,
    required: false,
    default: true,
  },
})
</script>

<template>
  <NuxtLink v-if="inSite" :to="link" class="nav-item" :data-badge="badge">
    {{ label }}
  </NuxtLink>
  <a v-else :href="link" class="nav-item" :data-badge="badge" target="_blank">{{
    label
  }}</a>
</template>

<style lang="scss" scoped>
.nav-item {
  @apply h-full flex items-center;
  @apply text-[15px] border-b-2 border-transparent;
  @apply relative;
  @apply opacity-85;
  @apply text-black dark:text-[#e8ecfa];

  &:hover {
    @apply border-b-primary;
    @apply opacity-100;
  }

  &::after {
    @apply absolute left-2/3 top-2;
    @apply bg-red-500 text-white;
    @apply rounded-full px-1.5 py-0.5 whitespace-nowrap;
    @apply transform-gpu scale-60 origin-top-left;
    @apply pointer-events-none;
    content: attr(data-badge);
  }

  &[data-badge='']::after {
    content: unset;
  }

  &.router-link-exact-active {
    @apply pointer-events-none;
    @apply opacity-100 text-primary;
  }
}
</style>
