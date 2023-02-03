<template>
  <!-- 问题: 插槽 main 的外层会多一个div包裹，影响dom结构  -->
  <div
    class="HoverBox"
    @mouseenter="
      () => {
        enter()
      }
    "
    @mouseleave="leave"
  >
    <!-- 包裹的内容 -->
    <slot name="main"> </slot>
    <!-- 鼠标悬浮后展示的弹窗 -->
    <div
      v-if="show"
      ref="boxRef"
      class="box"
      :class="[
        topType ? 'box-top' : 'box-bottom',
        animateClass ? 'comein' : '',
      ]"
      @mouseenter="enter(true)"
      @mouseleave="leave"
    >
      <slot name="box"> </slot>
      <span
        class="arrow"
        :class="topType ? 'arrow-top' : 'arrow-bottom'"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, nextTick } from 'vue'

const boxRef = ref<HTMLInputElement | null>(null) //悬浮窗的dom，用于调整弹窗位置，防止弹出屏幕边缘
const show: Ref<boolean> = ref(false) //弹出层是否显示
const topType: Ref<boolean> = ref(true) //弹出层在上还是在下，上true 下false
const animateClass: Ref<boolean> = ref(false) //渐入渐出效果，用transition和类名

//#region  鼠标进入离开事件
let timer: number //控制关闭弹窗效果
let timer2: number //控制打开弹窗效果
const enter = async (flag?: boolean) => {
  clearTimeout(timer)
  timer2 = window.setTimeout(async () => {
    show.value = true
    if (flag == true) return //如果传递了标识true，则不继续往下执行
    await nextTick()
    animateClass.value = true //盒子透明度变为1
    offectBox() //修正盒子位置
  }, 300) //300ms内移出了就不弹出
}
const leave = () => {
  clearTimeout(timer)
  clearTimeout(timer2)
  timer = window.setTimeout(() => {
    // console.log('离开')
    animateClass.value = false //盒子透明度变为0
    show.value = false //关闭盒子显示
    topType.value = true //朝向设置回默认值
  }, 300) //离开盒子300ms后才进行关闭动作
}
//#endregion

//修正盒子位置
const offectBox = () => {
  const position: any = boxRef.value?.getBoundingClientRect()
  //   console.log(position)
  if (position.left < 0) {
    //如果盒子左侧超过屏幕边缘，则修正位置
    ;(boxRef.value as HTMLInputElement).style.marginLeft = -position.left + 'px'
  }
  if (position.top < 0) {
    //如果盒子上侧超过屏幕，则换为朝下的布局
    topType.value = false
  }
}
</script>

<style lang="scss" scoped>
.HoverBox {
  display: inline-block;
  position: relative;
  .box {
    position: absolute;
    left: 50%;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.226);
    z-index: 99;
    cursor: default;
    opacity: 0;
    transition: opacity 0.8s;
    @apply dark:shadow-lg dark:shadow-white/5;
    &.box-top {
      top: 0;
      transform: translate(-50%, calc(-100% - 10px)); //加上了三角形高度
    }
    &.box-bottom {
      bottom: 0;
      transform: translate(-50%, calc(100% + 10px)); //加上了三角形高度
    }
    &.comein {
      opacity: 1;
    }
    .arrow {
      position: absolute;
      left: 50%;
      width: 0;
      height: 0;
      line-height: 0;
      font-size: 0;
      @apply border-10 border-[#ffffff];
      @apply dark:border-[#333333];
      &.arrow-top {
        bottom: 1px;
        transform: translate(-50%, 100%);
        @apply border-l-transparent border-r-transparent border-b-transparent;
        @apply dark:border-l-transparent dark:border-r-transparent dark:border-b-transparent;
      }
      &.arrow-bottom {
        top: 1px;
        transform: translate(-50%, -100%);
        @apply border-l-transparent border-r-transparent border-t-transparent;
        @apply dark:border-l-transparent dark:border-r-transparent dark:border-t-transparent;
      }
    }
  }
}
</style>
