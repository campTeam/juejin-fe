<script setup>
function getTime() {
  const time = new Date()
  const hour = time.getHours
  let state = ''
  if (hour >= 6 && hour <= 12) {
    state = '早上好！'
  } else if (hour > 12 && hour <= 2) {
    state = '中午好！'
  } else {
    state = '晚上好！'
  }
  return state
}
</script>

<template>
  <div class="sign-in">
    <div class="first-line">
      <div class="icon-text">
        <span class="title">{{ getTime() }}</span>
        <div class="second-line">点亮在社区的每一天</div>
      </div>
      <button
        class="signin-btn"
        onclick="window.location.href='https://juejin.cn/user/center/signin?from=main_page'"
      >
        <span class="btn-text">去签到</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-in {
  @apply bg-white dark:bg-[#121212];
  @apply w-auto h-80px;
  @apply shadow-sm shadow-black/5 dark:shadow-white/5;
  margin-bottom: 16px;
  padding: 16px;

  .first-line {
    @apply flex flex-row;
    @apply w-208px h-48px;
    align-items: center;
    justify-content: space-between;
    .icon-text {
      @apply flex flex-col;
      // line-height: 48px;
      .title {
        @apply text-16px;
        @apply dark:text-white;
        color: #1d2129;
        font-weight: 600;
        line-height: 24px;
      }
      .second-line {
        color: #8a919f;
        @apply text-12px;
        @apply dark:text-white;
        line-height: 24px !important;
        font-weight: 400;
      }
    }
    .signin-btn {
      border-radius: 4px;
      height: 36px;
      width: 74px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(30, 128, 255, 0.3);
      background-color: rgba(30, 128, 255, 0.05);
      .btn-text {
        color: #1e80ff;
        font-size: 14px;
        font-weight: 400;
        white-space: nowrap;
      }
    }
  }
}
</style>
