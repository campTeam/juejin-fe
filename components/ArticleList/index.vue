<template>
  <div class="article-list">
    <ul class="tab">
      <li
        v-for="(k, i) in arr"
        :key="k"
        class="tab-item"
        :class="i == nowIndex ? 'tab-active' : ''"
        @click="changeTab(i)"
      >
        {{ k }}
      </li>
    </ul>
    <ul class="list">
      <li v-for="k of 30" :key="k" class="item">
        <div class="top">
          <ArticleListHoverBox
            v-slot="{ setSlotRef }"
            writer-name="掘金酱"
            writer-motto="测试内容"
            writer-avatar="https://p3-passport.byteimg.com/img/user-avatar/a87f08adcd0dad907726396180915552~100x100.awebp"
          >
            <div :ref="setSlotRef" class="top-item author">掘金酱</div>
          </ArticleListHoverBox>
          <div class="top-item time">25天前</div>
          <div class="top-item tag">
            {{ ['后端', 'GitHub', '掘金'].join(' · ') }}
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="title">
              「兔了个兔」创意投稿大赛来袭！秀兔兔创意，迎新年好礼！
            </div>
            <div class="content">
              这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
            </div>
          </div>
          <img
            v-if="k % 2 == 0"
            src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb72413461364175af5edf2a1fae4446~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?"
            alt=""
            class="right"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
const arr: string[] = ['推荐', '最新', '热榜']
const nowIndex: Ref<number> = ref(0)
const nowPage: Ref<number> = ref(1) //当前是第几页 初始为1
const loading: Ref<boolean> = ref(false) //是否正在请求

//切换栏目
const changeTab = (i: number) => {
  nowIndex.value = i
  nowPage.value = 1 //切换栏目后需要重新分页
}

//页面触底
//防止document获取不到而报错
if (process.client) {
  const { arrivedState } = useScroll(document) //监听document页面滚动
  //监视页面是否触底 true or false
  watch(
    () => arrivedState.bottom,
    (newValue, oldValue) => {
      if (newValue) arrivedBottom()
    }
  )
  //触底后的处理
  const arrivedBottom = () => {
    if (loading.value) return
    loading.value = true
    nowPage.value++
    console.log('触底啦, 当前需要请求第', nowPage.value, '页')
    setTimeout(() => {
      loading.value = false
      console.log('请求完成')
    }, 2000) //模拟请求
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  @apply w-full;
  @apply rounded-sm bg-white dark:bg-[#121212];

  .tab {
    @apply flex items-center;
    @apply h-11 w-full px-3;
    @apply border-b-1 border-gray-100 dark:border-[#292929];

    .tab-item {
      @apply text-sm leading-4 text-[#909090];
      @apply cursor-pointer;
      @apply px-3.5;
      @apply border-r-1 border-gray-200 dark:border-[#494949];

      &:last-child {
        @apply border-r-0;
      }

      &.tab-active,
      &:hover {
        @apply text-primary;
      }
    }
  }

  .list {
    @apply w-full;

    .item {
      @apply pt-3 px-5;
      &:hover {
        @apply bg-[#fafafa] dark:bg-[#252525];
        cursor: pointer;
      }
      &:last-child .bottom {
        @apply border-b-0;
      }

      .top {
        @apply flex items-start;
        @apply h-6 text-0.8em;

        .top-item {
          @apply leading-4 text-[#86909c];
          @apply px-2;
          @apply border-r-1 border-gray-200 dark:border-[#494949];

          &:first-child {
            @apply pl-0;
          }

          &:last-child {
            @apply border-r-0;
          }
        }
      }

      .bottom {
        @apply flex justify-between;
        @apply pb-3;
        @apply border-b-1 border-gray-200 dark:border-[#494949];

        .left {
          @apply flex flex-col justify-start;

          .title {
            @apply font-bold text-[16px];
            @apply leading-6 text-[#1d2129] dark:text-[#c8cbd7];
            @apply w-full;
            @apply text-ellipsis overflow-hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .content {
            @apply mt-2;
            @apply text-[#86909c] text-14px leading-22px;
            @apply text-ellipsis overflow-hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }

        .right {
          @apply ml-6;
          @apply rounded-sm w-120px h-80px;
        }
      }
    }
  }
}
</style>
