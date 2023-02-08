<script lang="ts" setup>
import { onMounted, ref, useSlots, Ref, inject } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const slots = useSlots()

defineProps({
  offset: {
    type: Number,
    default: 0,
  },
  wider: {
    type: Boolean,
    default: false,
  },
})

const AsideLeftEl = ref<HTMLElement | null>(null)

const showFloatElement = ref(false)
const isHeaderVisible = inject('isHeaderVisible') as Ref<boolean>

onMounted(() => {
  if (slots.aside && slots.asideFloat) {
    useIntersectionObserver(AsideLeftEl, ([{ isIntersecting }]) => {
      showFloatElement.value = !isIntersecting
    })
  }
})
</script>

<template>
  <div class="main" :class="{ wider }">
    <div class="aside-right">
      <slot></slot>
    </div>
    <div v-if="$slots.aside" class="aside-left">
      <div ref="AsideLeftEl" class="aside-normal">
        <slot name="aside"></slot>
      </div>
      <Transition name="fade">
        <div
          v-if="$slots.aside && $slots.asideFloat && showFloatElement"
          class="aside-left-float"
          :class="{ 'header-offset': isHeaderVisible }"
          :style="{
            top: `${offset}px`,
          }"
        >
          <div class="transform-controller">
            <slot name="asideFloat"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply m-x-auto max-w-960px;
  @apply flex justify-between items-start;

  .aside-right {
    @apply flex-grow pb-6;
  }

  .aside-left {
    @apply block flex-shrink-0;
    @apply ml-5 w-240px;

    @media (max-width: 960px) {
      @apply hidden;
    }

    .aside-normal {
      @apply space-y-4.2 pb-60px;
    }
  }

  .aside-left-float {
    @apply fixed w-240px;
    @apply mt-6;

    .transform-controller {
      // 这个 div 仅仅是为了防止 transform 过渡影响到 Vue 的 Transition 组件
      @apply space-y-4.2;
      @apply transform-gpu transition-transform;
    }

    &.header-offset .transform-controller {
      @apply translate-y-50px sm:translate-y-60px;
    }
  }

  &.wider {
    @apply max-w-1140px;

    .aside-left {
      @apply w-300px;

      @media (max-width: 1140px) {
        @apply hidden;
      }
    }

    .aside-left-float {
      @apply w-300px;
    }
  }
}
</style>
