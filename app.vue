<script setup lang="ts">
const { data: meta } = await useFetch('/api/global/meta')

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: meta.value!.data.favicon,
    },
  ],
  titleTemplate: titleChunk => {
    return titleChunk
      ? `${titleChunk} - ${meta.value!.data.siteName}`
      : meta.value!.data.siteName
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: meta.value!.data.defaultSEO.description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: meta.value!.data.defaultSEO.keywords,
    },
  ],
})

provide('meta', meta.value!.data)

// 下面是 header 显示与隐藏的逻辑（仅客户端）

const isHeaderVisible = ref(true)
provide('isHeaderVisible', isHeaderVisible)

if (process.client) {
  const { directions, isScrolling, arrivedState } = useScroll(document)
  const checkHeaderStatus = useDebounceFn(
    (top: boolean, bottom: boolean, topArrived: boolean) => {
      if (topArrived) {
        // 当滚动到顶部时，避免因为safari的橡皮筋效果导致header闪烁
        // TODO: 按理说底部也需要判断，但是safari的高度计算存在问题，暂未想到如何解决
        isHeaderVisible.value = true
        return
      }
      if (top) {
        isHeaderVisible.value = true
      } else if (bottom) {
        isHeaderVisible.value = false
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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
