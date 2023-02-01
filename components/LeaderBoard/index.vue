<script lang="ts" setup></script>

<template>
  <div class="author_list">
    <header class="author_text">🎖️作者榜</header>
    <div class="user_list">
      <div v-for="item in 3" :key="item" class="item">
        <a href="">
          <img
            src="https://p3-passport.byteimg.com/img/user-avatar/61130727b6e6bf9ed813434aeaed8ac3~100x100.awebp"
            target="_blank"
            alt=""
          />
          <div class="user_info">
            <div class="flex_box">
              <span class="user_name">前端发达仔</span>
              <span>
                <img
                  src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-7.5da15b8.png"
                  alt=""
                />
              </span>
            </div>
            <div class="user_text">简介简介而间</div>
          </div>
        </a>
      </div>
    </div>
    <div class="author_botton">
      <span>完整榜单</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a:hover {
  @apply text-primary;
}

.author_list {
  @apply bg-white h-295px dark:bg-[#121212];
  width: 100%;
}
.author_text {
  height: 42px;
  font-size: 14px;
  line-height: 14px;
  color: #333;
  padding: 12px 15px;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
}

.user_list {
  width: 100%;
  height: calc(100% - 84px);
}
.author_botton {
  color: #007fff;
  padding: 12px 0;
  text-align: center;
  border-top: 1px solid hsla(0, 0%, 59.2%, 0.1);
  cursor: pointer;
  font-size: 14px;
}
.item a {
  @apply flex;
  align-items: center;
  padding: 12px 15px;
}
.item:hover {
  background-color: hsla(0, 0%, 84.7%, 0.1);
}
.item > a > img {
  @apply w-45px h-45px mr-6px;
  border-radius: 50%;
}
.user_info img {
  @apply w-35px h-16px;
}
.user_name {
  max-width: 128px;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.user_text {
  color: #909090;
  font-size: 12px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flex_box {
  @apply flex;
}
</style>
