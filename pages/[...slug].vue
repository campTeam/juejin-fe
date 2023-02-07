<!-- 这是 404 页面 -->

<template>
  <div class="view-wrapper">
    <img
      class="notfound-image"
      src="~~/assets/images/notfound.svg"
      alt="Not Found"
    />

    <!-- TODO: 这里的按钮是否需要封装？ -->
    <NuxtLink class="button" to="/">回到首页</NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.view-wrapper {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-[#222323];
  @apply flex flex-col justify-center items-center;

  .notfound-image {
    @apply mb-12;
    @apply dark:(filter brightness-65);
  }

  .button {
    @apply text-primary;
    @apply border-1 border-primary;
    @apply px-4 py-2;
  }
}
</style>
