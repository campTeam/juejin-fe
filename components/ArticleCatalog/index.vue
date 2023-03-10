<script lang="ts" setup>
import type { Ref } from 'vue'
import type { ICatalogItem } from '../ArticleRender/types'

const props = defineProps<{
  catalog: ICatalogItem[]
  activeTitle: string
}>()

const catalogContainerRef = ref(null) as Ref<HTMLDivElement | null>
const catalogRef = reactive({} as Record<string, HTMLDivElement>)

// 激活的标题改变时，将容器滚动，使得其刚好位于目录容器的中间位置
watch(
  () => props.activeTitle,
  val => {
    if (val && catalogRef[val]) {
      if (!catalogContainerRef.value) return

      const itemTop = catalogRef[val].offsetTop
      const container = catalogContainerRef.value.parentElement
      const containerHeight = container!.clientHeight
      container!.scrollTop = itemTop - containerHeight / 2
    }
  }
)
</script>

<template>
  <ArticleSideItem>
    <template #title>目录</template>
    <template #default>
      <div ref="catalogContainerRef" class="catalog-content">
        <div
          v-for="item in catalog"
          :key="item.key"
          :ref="
              el => {
                catalogRef[item.key] = el as HTMLDivElement
              }
            "
          class="item-container"
          :class="{ active: activeTitle === item.key }"
        >
          <a :class="['level-' + item.level]" :href="'#' + item.key">{{
            item.title
          }}</a>
        </div>
      </div>
    </template>
  </ArticleSideItem>
</template>

<style lang="scss" scoped>
.catalog-content {
  @apply flex flex-col items-stretch;

  .item-container {
    @apply mb-1 relative;
    @apply px-3;

    &::before {
      content: '';
      @apply absolute left-0 top-4px;
      @apply h-16px w-4px mt-7px;
      @apply bg-primary rounded-r-4px;
      @apply transition-opacity opacity-0;
    }

    &.active {
      @apply pointer-events-none;
      @apply text-primary;

      &::before {
        @apply opacity-100;
      }
    }

    a {
      @apply block p-10px text-15px rounded-md;
      @apply whitespace-nowrap overflow-hidden overflow-ellipsis;

      &:hover {
        @apply bg-[#f7f8fa] dark:bg-[#202022];
      }

      &.level-1 {
        @apply ml-26px;
      }

      &.level-2 {
        @apply ml-41px;
      }

      &.level-3 {
        @apply ml-56px;
      }

      &.level-4 {
        @apply ml-71px;
      }

      &.level-5 {
        @apply ml-86px;
      }
    }
  }
}
</style>
