<script setup lang="ts">
import type { ICatalogItem } from '~~/components/ArticleRender/types'
import type { IArticle } from '~~/server/api/article/[id]'

const route = useRoute()
const id = parseInt(route.params.id as string)

if (isNaN(id)) {
  navigateTo('/404')
}

const { data: article } = await useFetch(`/api/article/${id}`)

if (article.value?.code !== 200) {
  navigateTo('/404')
}

const articleData = article.value!.data as IArticle

const catalogList = ref([] as ICatalogItem[])

const generateCatalog = (payload: ICatalogItem[]) => {
  catalogList.value = payload
}

const activeTitleId = ref('')

const setActiveTitle = (title: string | null) => {
  activeTitleId.value = title || ''
}
</script>

<template>
  <div class="wrapper">
    <Aside :wider="true">
      <article>
        <h1 class="title">{{ articleData.title }}</h1>
        <div class="writer-wrapper">
          <img :src="articleData.writer.avatar" alt="" />
          <div class="details">
            <div class="name">{{ articleData.writer.name }}</div>
            <div class="publish-time">
              {{
                useDateFormat(articleData.time, 'YYYY年MM月DD日 HH:mm').value
              }}
            </div>
          </div>
        </div>
        <img v-if="articleData.image" :src="articleData.image" alt="" />
        <ArticleRender
          :article="articleData.content"
          @generate-catalog="generateCatalog"
          @active-title="setActiveTitle"
        />
      </article>
      <template #aside>
        <WriterCard :writer="articleData.writer" />
        <ArticleCatalog
          v-if="catalogList.length"
          style="position: absolute"
          :catalog="catalogList"
          :active-title="activeTitleId"
        />
      </template>
      <template #asideFloat>
        <ArticleCatalog
          v-if="catalogList.length"
          :catalog="catalogList"
          :active-title="activeTitleId"
        />
      </template>
    </Aside>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply bg-[#f4f5f5] dark:bg-[#333333] w-full h-auto pt-4;

  article {
    @apply bg-white dark:bg-[#121212];
    @apply rounded-4px p-32px max-w-100vw;

    .title {
      @apply text-24px md:text-32px font-extrabold;
      @apply mb-5;
      @apply leading-[1.31] !important;
    }

    .writer-wrapper {
      @apply flex items-center mb-5;

      img {
        @apply rounded-full w-40px h-40px;
        @apply mr-12px;
      }

      .details {
        @apply flex flex-col;

        .name {
          @apply max-w-128px text-17px;
        }

        .publish-time {
          @apply text-[#999999] dark:text-[#666666];
          @apply text-14px mt-2;
        }
      }
    }
  }
}
</style>
