<script lang="ts" setup>
import type { IMeta } from '~~/server/api/global/meta'

const meta = inject('meta') as IMeta
</script>

<template>
  <div class="downlink">
    <a :href="meta.gadget.link" target="_blank">
      <div class="link-content">
        <img :src="meta.gadget.qrcode" alt="" />
        <div class="link-desc">
          <div class="link-title">{{ meta.gadget.title }}</div>
          <div class="link-subtitle">{{ meta.gadget.subtitle }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.downlink {
  @apply bg-white dark:bg-[#121212];
  @apply w-auto rounded-sm;
  @apply shadow-sm shadow-black/5 dark:shadow-white/5;

  .link-content {
    @apply p-3;
    @apply flex items-stretch justify-start;
    img {
      @apply w-50px h-50px mr-3;
    }

    .link-desc {
      @apply flex flex-col justify-between;

      .link-title {
        @apply text-black dark:text-white;
        @apply text-14px leading-22px;
      }

      .link-subtitle {
        @apply text-gray-400 text-12px leading-20px;
        @apply mt-7px;
      }
    }
  }
}
</style>
