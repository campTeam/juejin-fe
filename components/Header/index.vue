<script setup lang="ts">
const { data } = await useFetch('/api/global/nav')
</script>

<template>
  <div class="header-wrapper">
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
              :in-site="nav.inSite"
            />
          </div>
        </div>
        <div class="right">
          <ClientOnly>
            <UtilsDarkModeMonitor />
          </ClientOnly>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.header-wrapper {
  @apply h-[50px] md:h-[60px];
}

header {
  @apply fixed top-0 left-0 right-0 z-10;
  @apply h-[50px] md:h-[60px];
  @apply bg-white dark:bg-[#121212];
  @apply border-b-[1px] border-gray-200 dark:border-[#494949];

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

    &:deep(.logo-text) {
      @apply dark:fill-[#e0e0e0];
      @apply hidden sm:block;
    }
  }

  .main-nav {
    @apply flex h-full;
    @apply ml-[24px];
    @apply gap-x-[22px];
  }
}
</style>
