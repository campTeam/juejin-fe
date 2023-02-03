<template>
  <!-- 包裹的内容 -->
  <slot :set-slot-ref="setSlotRef"></slot>
  <!-- 鼠标悬浮后展示的弹窗 -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isBoxShown"
        ref="boxRef"
        class="box"
        :class="[boxDirection ? 'box-top' : 'box-bottom']"
        :style="{ top: `${boxY}px`, left: `${boxX}px` }"
        @mouseenter="enter(true)"
        @mouseleave="leave()"
      >
        <div class="writer-detail">
          <img :src="writerAvatar" class="left" />
          <div class="right">
            <div class="name">{{ writerName }}</div>
            <div class="detail">{{ writerMotto }}</div>
          </div>
        </div>
        <!-- 弹出层箭头 -->
        <svg
          class="arrow"
          :class="boxDirection ? 'arrow-top' : 'arrow-bottom'"
          :style="{
            '--tw-translate-x': `calc(-50% + ${arrowOffset}px)`,
          }"
        >
          <!-- 箭头主体 -->
          <path class="arrow-bg" d="M 0 0 L 10 10 L 20 0 Z" />
          <!-- 腰线描边 -->
          <path class="arrow-stroke" d="M 0 0 L 10 10 L 20 0" />
        </svg>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

const boxRef = ref<HTMLElement | null>(null) // 弹出层的元素引用，用于调整弹窗位置，防止弹出屏幕边缘
const isBoxShown: Ref<boolean> = ref(false) // 弹出层是否显示
const boxDirection: Ref<boolean> = ref(true) // 弹出层在上还是在下，上true 下false
const boxX = ref(0) // 弹出层的x坐标
const boxY = ref(0) // 弹出层的y坐标
const arrowOffset = ref(0) // 箭头的偏移量

const slotRef = ref<any>(null) // 插槽的元素引用
const setSlotRef = (ref: any) => {
  slotRef.value = ref
}

defineProps<{
  writerName: string
  writerMotto: string
  writerAvatar: string
}>()

watch(slotRef, (newEl, oldEl) => {
  if (newEl) {
    // 监听插槽的变化，当鼠标进入插槽元素时，显示弹出层
    newEl.addEventListener('mouseenter', enter)
    newEl.addEventListener('mouseleave', leave)
  }
  if (oldEl) {
    // 移除旧的监听
    oldEl.removeEventListener('mouseenter', enter)
    oldEl.removeEventListener('mouseleave', leave)
  }
})

// #region 鼠标进入离开事件
let timer: number // 控制关闭弹窗效果
let timer2: number // 控制打开弹窗效果
const enter = async (flag?: boolean) => {
  clearTimeout(timer)
  timer2 = window.setTimeout(async () => {
    isBoxShown.value = true
    if (flag == true) return // 如果传递了标识true，则不继续往下执行
    await nextTick()
    offectBox() // 修正盒子位置
  }, 300) // 300ms内移出了就不弹出
}
const leave = () => {
  clearTimeout(timer)
  clearTimeout(timer2)
  timer = window.setTimeout(() => {
    isBoxShown.value = false // 关闭盒子显示
    boxDirection.value = true // 朝向设置回默认值
  }, 300) // 离开盒子300ms后才进行关闭动作
}
// #endregion

// 修正盒子位置
const offectBox = () => {
  const slotRect: any = slotRef.value?.getBoundingClientRect()
  const boxRect: any = boxRef.value?.getBoundingClientRect()
  const _boxX = slotRect.x + slotRect.width / 2 - boxRect.width / 2
  const _boxYTop = slotRect.y - boxRect.height - 10
  const _boxYBottom = slotRect.y + slotRect.height + 10

  // 如果弹窗超出屏幕边缘，则朝下弹出
  if (_boxYTop < 0) {
    boxDirection.value = false
  } else {
    boxDirection.value = true
  }

  boxX.value = Math.max(10, _boxX)
  boxY.value = boxDirection.value ? _boxYTop : _boxYBottom
  arrowOffset.value = _boxX - boxX.value
  console.log(arrowOffset.value)
}
</script>

<style lang="scss" scoped>
.box {
  @apply fixed z-22;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
  @variants dark {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
  }

  .writer-detail {
    @apply flex p-10px rounded-md;
    @apply bg-[#ffffff] dark:bg-[#121212];
    @apply border-1 border-gray-200 dark:border-[#494949];

    .left {
      @apply w-12 h-12 rounded-full;
    }

    .right {
      @apply min-w-100px max-w-200px ml-10px;
      @apply flex flex-col justify-center;

      .name {
        @apply text-16px mb-3;
        @apply text-black dark:text-white/90;
        @apply overflow-hidden text-ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .detail {
        @apply text-12px;
        @apply overflow-hidden text-ellipsis;
        @apply text-gray-400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }

  .arrow {
    @apply absolute left-1/2 w-20px h-10px;
    @apply transform-gpu;

    .arrow-bg {
      @apply fill-white dark:fill-[#121212];
    }

    .arrow-stroke {
      @apply stroke-gray-200 dark:stroke-[#494949] fill-none;
    }

    &.arrow-top {
      @apply bottom-1px translate-y-full;
    }

    &.arrow-bottom {
      @apply top-1px -translate-y-full rotate-180;
    }
  }
}
</style>
