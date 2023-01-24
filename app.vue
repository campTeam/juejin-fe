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
})

provide('meta', meta.value!.data)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
