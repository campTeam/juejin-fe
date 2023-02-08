<script lang="ts" setup>
import { IWriter } from '~~/server/api/global/meta'

defineProps<{
  writer: IWriter
}>()
</script>

<template>
  <ArticleSideItem>
    <div class="writercard-wrapper">
      <img :src="writer.avatar" alt="" />
      <div class="details">
        <div class="name">{{ writer.name }}</div>
        <div class="motto">{{ writer.motto }}</div>
      </div>
    </div>
  </ArticleSideItem>
</template>

<style lang="scss" scoped>
.writercard-wrapper {
  @apply p-5 flex items-center;

  img {
    @apply w-12 h-12 rounded-full;
  }

  .details {
    @apply ml-4;
    @apply flex flex-col;

    .name {
      @apply max-w-180px text-lg;
      @apply overflow-ellipsis whitespace-nowrap overflow-hidden;
    }

    .motto {
      @apply text-[#515767];
    }
  }
}
</style>
