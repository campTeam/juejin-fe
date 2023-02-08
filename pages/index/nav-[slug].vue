<script setup lang="ts">
import type { Ref } from 'vue'
import type { ICategoryItem } from '~~/server/api/categories'

const currentCategory = inject('currentCategory') as Ref<ICategoryItem>

const isFetching = ref(true)
const isEnded = ref(false)

const fetchList = async (page: number = 1) => {
  isFetching.value = true
  const { data: _articleList } = await useFetch('/api/articles', {
    query: {
      page,
      cate: currentCategory.value.id,
    },
  })
  isFetching.value = false

  return _articleList.value!.data
}

const articleList = await fetchList()
if (articleList.length < 10) {
  isEnded.value = true
}

const requestFetch = async () => {
  if (isEnded.value || isFetching.value) return
  const _articleList = await fetchList(articleList.length / 10 + 1)
  if (_articleList.length < 10) {
    isEnded.value = true
  }
  articleList.push(..._articleList)
}

const isPageLoading = inject('isPageLoading') as Ref<boolean>
</script>

<template>
  <div>
    <div v-if="isPageLoading" class="skeleton">
      <Skeleton :rows="4" animated />
    </div>
    <ArticleList v-else :article-list="articleList" @fetch="requestFetch" />
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  @apply bg-white dark:bg-[#121212];
  @apply rounded-sm p-4;
}
</style>
