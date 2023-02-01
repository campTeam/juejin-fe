<script lang="ts" setup></script>

<template>
  <div class="main">
    <div class="aside-right">
      <slot></slot>
    </div>
    <div class="aside-left">
      <slot name="aside">
        <MainAside />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply max-w-960px m-x-auto;
  @apply flex justify-between;

  .aside-right {
    @apply flex-grow;
  }

  .aside-left {
    @apply flex-shrink-0;
    @apply w-240px block;
    @apply ml-5;

    @media (max-width: 960px) {
      @apply hidden;
    }
  }
}
</style>
