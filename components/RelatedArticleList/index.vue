<script setup lang="ts">
import type { IArticleList } from '~~/server/api/articles'

defineProps<{
  articles: IArticleList
}>()
</script>

<template>
  <ArticleSideItem>
    <template #title>相关文章</template>
    <template #default>
      <div class="related-content">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="`/article/${article.id}`"
          target="_blank"
          class="item"
        >
          <div class="title">{{ article.title }}</div>
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
              class="writer"
            >
              {{ article.writer.name }}
            </div>
          </ArticleListHoverBox>
        </NuxtLink>
      </div>
    </template>
  </ArticleSideItem>
</template>

<style lang="scss" scoped>
.related-content {
  @apply grid grid-cols-1 gap-y-5;
  @apply px-5 py-3;

  .item {
    @apply flex flex-col items-start;

    .title {
      @apply text-15px leading-[1.2];
      @apply overflow-hidden overflow-ellipsis text-black dark:text-white/90;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .writer {
      @apply text-sm max-w-200px mt-2;
      @apply overflow-hidden overflow-ellipsis;
      @apply text-gray-400 dark:text-gray-500/90;
    }

    &:hover .title {
      @apply text-primary;
    }
  }
}
</style>
