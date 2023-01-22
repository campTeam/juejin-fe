<script setup lang="ts"></script>

<template>
  <header>
    <div class="width-limit-wrapper">
      <div class="left">
        <NuxtLink class="logo" to="/">
          <Logo />
        </NuxtLink>
        <div class="main-nav" />
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
}
</style>
