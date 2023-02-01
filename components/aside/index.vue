<script lang="ts" setup>
import { onMounted, ref, useSlots, Ref, inject } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const slots = useSlots()

defineProps({
  offset: {
    type: Number,
    default: 0,
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
  <div class="main">
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
  @apply max-w-960px m-x-auto;
  @apply flex justify-between items-start;

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

    .aside-normal {
      @apply space-y-4.2;
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
}
</style>
