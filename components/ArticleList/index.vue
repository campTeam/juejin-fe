<script setup lang="ts">
import { IArticleList } from '~~/server/api/articles'
import type { Ref } from 'vue'

defineProps<{
  articleList: IArticleList
}>()

const emit = defineEmits<{
  (event: 'fetch'): void
}>()

const InfiniteScrollCheckRef: Ref<HTMLElement | null> = ref(null)

useIntersectionObserver(
  InfiniteScrollCheckRef,
  async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emit('fetch')
    }
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  }
)
</script>

<template>
  <div class="article-list">
    <div class="list">
      <NuxtLink
        v-for="article of articleList"
        :key="article.id"
        class="item"
        :to="`/article/${article.id}`"
      >
        <div class="top">
          <ArticleListHoverBox
            v-slot="{ setSlotRef }"
            :writer-name="article.writer.name"
            :writer-motto="article.writer.motto"
            :writer-avatar="article.writer.avatar"
          >
            <div
              :ref="
                el => {
                  setSlotRef(el)
                }
              "
              class="top-item author"
            >
              {{ article.writer.name }}
            </div>
          </ArticleListHoverBox>
          <div class="top-item time">{{ useTimeAgoCN(article.time) }}</div>
          <div v-if="article.tags.length" class="top-item tag">
            {{ article.tags.join(' · ') }}
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="title">
              {{ article.title }}
            </div>
            <div class="content">
              {{ article.summary }}
            </div>
          </div>
          <img
            v-if="article.thumbnail"
            :src="article.thumbnail"
            alt=""
            class="right"
          />
        </div>
      </NuxtLink>
    </div>
    <div ref="InfiniteScrollCheckRef"></div>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  @apply w-full;
  @apply rounded-sm bg-white dark:bg-[#121212];

  .list {
    @apply w-full;

    .item {
      @apply pt-3 px-5 block overflow-hidden max-w-100vw;
      &:hover {
        @apply bg-[#fafafa] dark:bg-[#252525];
        cursor: pointer;
      }
      &:last-child .bottom {
        @apply border-b-0;
      }

      .top {
        @apply flex items-start;
        @apply h-6 text-0.8em;

        .top-item {
          @apply leading-4 text-[#86909c];
          @apply px-2;
          @apply border-r-1 border-gray-200 dark:border-[#494949];

          &:first-child {
            @apply pl-0;
          }

          &:last-child {
            @apply border-r-0;
          }

          &.author {
            @apply text-[#4e5969] dark:text-[#c8cbd7];
          }

          @apply whitespace-nowrap;

          &.tag {
            @apply flex-shrink;
            @apply overflow-ellipsis overflow-hidden;
          }
        }
      }

      .bottom {
        @apply flex justify-between;
        @apply pb-3;
        @apply border-b-1 border-gray-200 dark:border-[#494949];

        .left {
          @apply flex flex-col justify-start;
          @apply break-all;

          .title {
            @apply font-bold text-[16px];
            @apply leading-6 text-[#1d2129] dark:text-[#c8cbd7];
            @apply w-full;
            @apply overflow-ellipsis overflow-hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .content {
            @apply mt-2;
            @apply text-[#86909c] text-14px leading-22px;
            @apply overflow-ellipsis overflow-hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }

        .right {
          @apply ml-4 sm:ml-6;
          @apply rounded-sm w-120px h-80px;
        }
      }
    }
  }
}
</style>
