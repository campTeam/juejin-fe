<script setup lang="ts">
const { data } = await useFetch('/api/global/nav')
</script>

<template>
  <header>
    <div class="width-limit-wrapper">
      <div class="left">
        <NuxtLink class="logo" to="/">
          <Logo />
        </NuxtLink>
        <div v-if="data" class="main-nav">
          <HeaderNavItem
            v-for="nav of data.data"
            :key="nav.id"
            :label="nav.label"
            :link="nav.link"
            :badge="nav.badge || ''"
          />
        </div>
      </div>
      <div class="right"></div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply h-[60px];
  @apply border-b-[1px] border-gray-200;

  .width-limit-wrapper {
    @apply mx-auto;
    @apply flex items-center justify-between;
    @apply px-[12px];
    @apply max-w-[1416px] h-full;
  }

  .left,
  .right {
    @apply h-full;
    @apply flex items-center;
  }

  .logo {
    @apply h-[22px];
  }

  .main-nav {
    @apply flex h-full;
    @apply ml-[24px];
    @apply gap-x-[22px];
  }
}
</style>