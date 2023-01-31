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
      <li v-for="(k, i) in 10" :key="k" class="item">
        <div class="top">
          <div class="top-item author">掘金将</div>
          <div class="top-item time">25天前</div>
          <div class="top-item classification">后端 · GitHub</div>
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
            v-if="i % 2 == 0"
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

const changeTab = (i: number) => {
  nowIndex.value = i
}
</script>

<style lang="scss" scoped>
.article-list {
  @apply w-full md:w-700px;
  background: #ffffff;
  border-radius: 2px;
  .tab {
    width: 100%;
    height: 2.875rem;
    padding: 0.85rem 0.75rem;
    display: flex;
    border-bottom: 1px solid #e5e6eb;
    .tab-item {
      cursor: pointer;
      padding: 0 0.875rem;
      font-size: 0.85rem;
      border-right: 1px solid #eaeaea;
      &:last-child {
        border-right: none;
      }
      &.tab-active {
        color: #007fff;
      }
    }
  }
  .list {
    width: 100%;
    .item {
      padding: 0.75rem 1.25rem 0;
      &:last-child .bottom {
        border-bottom: none;
      }
      .top {
        display: flex;
        height: 1.375rem;
        font-size: 0.8rem;
        .top-item {
          padding: 0 0.5rem;
          border-right: 1px solid #e5e6eb;
          color: #86909c;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            border-right: none;
          }
          &.author {
            color: #4e5969;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #e5e6eb;
        .left {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          .title {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .content {
            margin-top: 0.5rem;
            color: #86909c;
            font-size: 13px;
            line-height: 22px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .right {
          margin-left: 24px;
          border-radius: 2px;
          width: 120px;
          height: 80px;
        }
      }
    }
  }
}
</style>
