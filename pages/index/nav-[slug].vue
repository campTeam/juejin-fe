<script setup lang="ts">
import type { Ref } from 'vue'
import type { ICategoryItem } from '~~/server/api/categories'

const currentCategory = inject('currentCategory') as Ref<ICategoryItem>

const isFetching = ref(false)
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
</script>

<template>
  <ArticleList
    :article-list="articleList"
    :is-fetching="isFetching"
    @fetch="requestFetch"
  />
</template>
