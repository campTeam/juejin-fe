<template>
  <div class="article-side-wrapper">
    <div v-if="$slots.title" class="article-side-title">
      <slot name="title"></slot>
    </div>
    <div class="article-side-content" :class="{ 'with-title': $slots.title }">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-side-wrapper {
  @apply rounded-4px w-300px;
  @apply bg-white dark:bg-[#121212];

  .article-side-title {
    @apply mx-20px py-16px;
    @apply text-base leading-2rem;
    @apply text-black dark:text-white;
    @apply border-b-1 border-gray-200 dark:border-[#494949];
  }

  .article-side-content {
    @apply max-h-460px relative overflow-auto;

    &.with-title {
      @apply mt-8px mr-4px;
    }

    &::-webkit-scrollbar {
      @apply w-6px h-80px;
    }

    &::-webkit-scrollbar-track {
      @apply shadow-none rounded-2px;
    }

    &::-webkit-scrollbar-thumb {
      @apply outline-none rounded-2px bg-[#e4e6eb] dark:bg-[#2c2e31];
    }
  }
}
</style>
