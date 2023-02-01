<script lang="ts" setup></script>

<template>
  <div class="down_link">
    <a href="">
      <div class="flex_box link_img">
        <img
          src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png"
          alt=""
        />
        <div>
          <div class="link_title">下载稀土掘金APP</div>
          <div class="link_text">一个帮助开发者成长的社区</div>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.down_link {
  @apply bg-white w-auto;
  height: 74px;
}
.flex_box {
  @apply flex;
}
.link_img {
  align-items: center;
  padding: 16px;
  justify-content: space-between;
}
.link_img img {
  @apply w-50px h-50px;
}
.link_title {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #1d2129;
}
.link_text {
  margin-top: 0.5rem;
  font-size: 12px;
  line-height: 20px;
  color: #86909c;
}
</style>
