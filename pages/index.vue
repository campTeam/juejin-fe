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
const isVisible: Ref<boolean> = ref(true)
if (process.client) {
  const { directions, isScrolling, arrivedState } = useScroll(document)
  const checkHeaderStatus = useDebounceFn(
    (top: boolean, bottom: boolean, topArrived: boolean) => {
      if (topArrived) {
        // 当滚动到顶部时，避免因为safari的橡皮筋效果导致header闪烁
        // TODO: 按理说底部也需要判断，但是safari的高度计算存在问题，暂未想到如何解决
        isVisible.value = true
        return
      }
      if (top) {
        isVisible.value = true
      } else if (bottom) {
        isVisible.value = false
      }
    },
    100
  )
  watch(directions, () => {
    if (isScrolling.value) {
      checkHeaderStatus(directions.top, directions.bottom, arrivedState.top)
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <div class="head" :class="{ visible: isVisible }">
      <nav class="subTab">
        <span
          v-for="(item, index) in subTab"
          :key="index"
          class="subTabItem"
          :class="{ active: subTabIndex === index }"
          @click="subTabIndex = index"
        >
          {{ item }}
        </span>
      </nav>
    </div>
    <p>TODO: 首页</p>
    <p v-for="i of Array.from({ length: 100 }, (_, i) => i + 1)" :key="i">
      用于测试滚动的文字
    </p>
  </div>
</template>

<style lang="scss">
.wrapper {
  @apply bg-[#f4f5f5] dark:bg-[#333333] w-full h-auto;
}
.head {
  @apply w-full h-11 flex justify-center;
  @apply bg-white dark:bg-[#121212];
  @apply border-b-1 border-gray-200 dark:border-[#494949];
  @apply sticky top-0 duration-300;
  &.visible {
    @apply top-[50px] sm:top-[60px];
  }
}
.subTab {
  @apply w-5xl h-full flex justify-start items-center gap-8;
  @apply overflow-x-scroll;
  @screen < md {
    @apply px-1;
  }
}
.subTab::-webkit-scrollbar {
  height: 0;
}
.subTabItem {
  @apply text-[15px] flex-none;
  @apply cursor-pointer;
  @apply text-black dark:text-[#e8ecfa];
  @apply hover:text-primary;
  &.active {
    @apply text-primary;
  }
}
</style>
