<script lang="ts" setup>
import { Ref } from 'vue'
const sign_sheet: Ref<number> = ref(0)
const sign_flag: Ref<boolean> = ref(true)
const more_link1 = {
  用户协议:
    'https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/86857833-55f6-4d9e-9897-45cfe9a42be4.html',
  营业执照: 'https://juejin.cn/license',
  隐私政策:
    'https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/7b28b328-1ae4-4781-8d46-430fef1b872e.html',
  关于我们: 'https://juejin.cn/about',
}

const more_link2 = {
  站点地图: 'https://juejin.cn/map-author-A-1',
  使用指南: 'https://juejin.cn/book/6844733795329900551',
  友情链接: 'https://juejin.cn/links',
  更多文章: 'https://juejin.cn/more_posts',
}
</script>

<template>
  <div class="sign_in_sheet">
    <div>连续签到 {{ sign_sheet }} 天</div>
    <div>
      <button v-if="sign_flag" class="sign_btn" @click="sign_flag = false">
        去签到
      </button>
      <button v-else class="sign_btn">已签到</button>
    </div>
  </div>
  <div class="buy_img">
    <a
      href="https://juejin.cn/pin/7190294399614451773?utm_source=webbanner&utm_medium=banner&utm_campaign=xcnewyear"
      type="_blank"
    >
      <img
        src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4023ed80e2794fb48858b4809b17f139~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"
        alt=""
      />
    </a>
  </div>
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
  <div class="resource_link">
    <div v-for="item in 3" :key="item" class="resource_item">
      <a href="" target="_blank" class="flex_box item_a">
        <img
          src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png"
          alt=""
        />
        <span> 稀土掘金漫游指南 </span>
      </a>
    </div>
  </div>
  <div class="details">
    <ul class="more_list">
      <li v-for="(val, key) in more_link1" :key="key">
        <a :href="val" target="_blank">{{ key }}</a>
      </li>
    </ul>
    <ul class="more_list">
      <li v-for="(val, key) in more_link2" :key="key">
        <a :href="val" target="_blank">{{ key }}</a>
      </li>
    </ul>
    <ul class="more_list">
      <li>
        <a href="https://beian.miit.gov.cn" target="_blank"
          >京ICP备18012699号-3</a
        >
      </li>
    </ul>
    <ul class="more_list">
      <li>
        <a href="https://juejin.cn/icp" target="_blank"
          >京ICP证：京B2-20191272</a
        >
      </li>
    </ul>
    <ul class="more_list">
      <li>
        <a
          class="flex_box"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802026719"
          target="_blank"
        >
          <img
            src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/police.d0289dc.png"
            alt="police"
            style="vertical-align: middle; margin-right: 3px"
          />
          京公网安备11010802026719号</a
        >
      </li>
      <li><span>版权所有：北京北比信息技术有限公司</span></li>
      <li><span>公司地址：北京市海淀区信息路甲28号13层B座13B-5</span></li>
      <li><span>公司座机：010-83434395</span></li>
      <li>
        <span
          >举报邮箱：<a href="mailto:feedback@xitu.io"
            >feedback@xitu.io</a
          ></span
        >
      </li>
    </ul>
    <ul class="more_list">
      <li><a>©2023 稀土掘金</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
a:hover {
  color: #007fff;
}
.sign_in_sheet {
  @apply h-80px bg-white flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}
.sign_btn {
  @apply w-74px h-36px flex-row justify-center items-center whitespace-nowrap;
  border-radius: 4px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  background-color: rgba(30, 128, 255, 0.05);
  color: #1e80ff;
  font-size: 14px;
  font-weight: 400;
}
.sign_btn:hover {
  background-color: rgba(30, 128, 255, 0.1);
}
.buy_img {
  @apply mt-4.2 mb-4.2;
}
.down_link {
  @apply mt-4.2 mb-4.2 bg-white w-auto;
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
.author_list {
  @apply bg-white h-295px;
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
.resource_link {
  @apply mt-4.2 mb-4.2 bg-white w-auto h-180px mb-16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  font-size: 14px;
  line-height: 1.29;
  color: #333;
}
.resource_item img {
  @apply w-36px h-36px mr-10px;
}
.item_a {
  align-items: center;
  padding: 12px;
  height: 100%;
}
.item_a span {
  position: relative;
  font-size: 14px;
  line-height: 1;
  color: #333;
}
.more_list {
  font-size: 12px;
  color: #9aa3ab;
}
.more_list li {
  @apply float-left mr-8px;
}
</style>
