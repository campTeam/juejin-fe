<script lang="ts" setup>
import { Ref } from 'vue'
useHead({
  title: '首页',
})
const subTab: string[] = [
  '综合',
  '后端',
  '前端',
  'Android',
  'iOS',
  '人工智能',
  '开发工具',
  '代码人生',
  '阅读',
]
const subTabIndex: Ref<number> = ref(0)
const isHeaderVisible = inject('isHeaderVisible') as Ref<boolean>
</script>

<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="header" :class="{ visible: isHeaderVisible }">
        <nav class="subtab">
          <span
            v-for="(item, index) in subTab"
            :key="index"
            class="subtab-item"
            :class="{ active: subTabIndex === index }"
            @click="subTabIndex = index"
          >
            {{ item }}
          </span>
        </nav>
      </div>
    </div>
    <!-- <p>TODO: 首页</p>
    <p v-for="i of Array.from({ length: 100 }, (_, i) => i + 1)" :key="i">
      用于测试滚动的文字
    </p> -->

    <ArticleList></ArticleList>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply bg-[#f4f5f5] dark:bg-[#333333] w-full h-auto pt-4;
}

.header-wrapper {
  @apply h-11;

  .header {
    @apply w-full h-11 flex justify-center;
    @apply bg-white dark:bg-[#121212];
    @apply border-b-1 border-gray-100 dark:border-[#494949];
    @apply fixed top-0 z-9;
    @apply transform-gpu transition-transform;
    @apply shadow-sm shadow-black/5 dark:shadow-white/5;

    &.visible {
      @apply translate-y-50px sm:translate-y-60px;
    }

    .subtab {
      @apply max-w-100vw w-5xl h-full;
      @apply flex justify-start items-center gap-8;
      @apply px-2;
      @apply overflow-x-auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      .subtab-item {
        @apply text-14px sm:text-15px;
        @apply cursor-pointer;
        @apply text-black/80 dark:text-[#81878c];
        @apply whitespace-nowrap;

        &.active,
        &:hover {
          @apply text-primary;
        }
      }
    }
  }
}
</style>
