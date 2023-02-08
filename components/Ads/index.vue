<script lang="ts" setup>
import type { IMeta } from '~~/server/api/global/meta'

const meta = inject('meta') as IMeta
</script>

<template>
  <div class="ads-wrapper">
    <a
      v-for="ad of meta.ads"
      :key="ad.id"
      :href="ad.link"
      target="_blank"
      :title="ad.summary"
    >
      <div class="ad">
        <img :src="ad.thumbnail" alt="" />
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.ads-wrapper {
  // 这里应该用方向为 column 的 flex 布局
  // 但是 flex 布局的 gap 兼容性不好，所以用 grid 布局代替了
  @apply grid grid-cols-1 gap-y-4.2;

  .ad,
  .ad img {
    @apply w-full rounded-4px;
  }

  .ad {
    @apply shadow-sm shadow-black/5 dark:shadow-white/5;
    @apply relative;

    img {
      @apply object-cover;
    }

    &::after {
      content: '广告';
      @apply opacity-70;
      @apply absolute bottom-2.5 right-2.5;
      @apply rounded-md border-white border-1 px-2;
      @apply text-base text-white bg-black/40;
      @apply transform-gpu scale-70 origin-bottom-right;
    }
  }
}
</style>
