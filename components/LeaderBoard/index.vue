<script lang="ts" setup>
import type { IMeta } from '~~/server/api/global/meta'

const meta = inject('meta') as IMeta
</script>

<template>
  <div class="leaderboard-wrapper">
    <div class="leaderboard-title">🎖️作者榜</div>
    <div
      v-for="writer of meta.leaderboard"
      :key="writer.id"
      class="writer-wrapper"
    >
      <img class="avatar" :src="writer.avatar" />
      <div class="details">
        <div class="name-level-wrapper">
          <span class="name">{{ writer.name }}</span>
          <img class="level" :src="meta.level[writer.level - 1].disImg" />
        </div>
        <span class="motto">{{ writer.motto }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a:hover {
  @apply text-primary;
}

.leaderboard-wrapper {
  @apply rounded-4px;
  @apply shadow-sm shadow-black/5 dark:shadow-white/5;
  @apply bg-white dark:bg-[#121212];

  .leaderboard-title {
    @apply text-sm text-black dark:text-white;
    @apply px-4 py-3;
    @apply border-b-1 border-gray-100 dark:border-[#494949];
  }

  .writer-wrapper {
    @apply flex p-3;

    .avatar {
      @apply w-46px h-46px;
      @apply rounded-full;
      @apply mr-2;
    }

    .details {
      @apply flex flex-col justify-center;

      .name-level-wrapper {
        @apply flex;
        .name {
          @apply text-16px text-black dark:text-white;
          @apply mb-1.5;
        }
        .level {
          @apply w-35px h-16px;
          @apply ml-1;
        }
      }

      .motto {
        @apply text-13px text-gray-400 dark:text-gray-400;
      }
    }
  }
}
</style>
