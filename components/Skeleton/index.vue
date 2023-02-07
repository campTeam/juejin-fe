<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 4,
  },
  animated: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="skeleton-wrapper">
    <div
      v-for="row in rows"
      :key="row"
      class="skeleton-item"
      :class="{
        last: rows > 2 && rows === row,
        animated,
        first: row === 1,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes skeleton-animation {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.skeleton-wrapper {
  width: 100%;

  .skeleton-item {
    width: 100%;
    height: 16px;
    border-radius: 4px;
    margin-top: 16px;

    &.first {
      margin-top: 0;
      width: 33%;
    }

    &.last {
      width: 61%;
    }

    background-color: #f0f2f5;
    background-size: 400% 100%;
    @variants dark {
      background-color: #303030;
    }

    &.animated {
      background-image: linear-gradient(
        90deg,
        #f0f2f5 25%,
        #e6e8eb 37%,
        #f0f2f5 63%
      );
      animation: skeleton-animation 1.4s ease infinite;

      @variants dark {
        background-image: linear-gradient(
          90deg,
          #303030 25%,
          #424243 37%,
          #303030 63%
        );
      }
    }
  }
}
</style>
