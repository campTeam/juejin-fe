<script setup>
useHead({
  title: '首页',
})
</script>

<template>
  <div>
    <p>TODO: 首页</p>
    <p v-for="i of Array.from({ length: 100 }, (_, i) => i + 1)" :key="i">
      用于测试滚动的文字12345
    </p>
  </div>
</template>
