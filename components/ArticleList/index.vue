<template>
  <div class="article-list">
    <ul class="tab">
      <li v-for="k in arr" :key="k" class="tab-item">{{ k }}</li>
    </ul>
    <div class="list">
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const arr: string[] = ['推荐', '最新', '热榜']
</script>

<style lang="scss" scoped>
.article-list {
  @apply w-full md:w-700px;
  background: pink;
  .tab {
    @apply w-60 grid grid-cols-3 divide-x;
    .tab-item {
      @apply text-center;
      &.tab-active {
      }
    }
  }
}
</style>
