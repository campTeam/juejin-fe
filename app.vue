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
})

provide('meta', meta.value!.data)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
