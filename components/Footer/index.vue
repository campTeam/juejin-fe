<script lang="ts" setup>
const more_link = {
  用户协议:
    'https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/86857833-55f6-4d9e-9897-45cfe9a42be4.html',
  营业执照: 'https://juejin.cn/license',
  隐私政策:
    'https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/7b28b328-1ae4-4781-8d46-430fef1b872e.html',
  关于我们: 'https://juejin.cn/about',
  站点地图: 'https://juejin.cn/map-author-A-1',
  使用指南: 'https://juejin.cn/book/6844733795329900551',
  友情链接: 'https://juejin.cn/links',
  更多文章: 'https://juejin.cn/more_posts',
}
</script>

<template>
  <!-- TODO: footer 目前未完成 -->
  <div class="details">
    <ul class="more_list">
      <li v-for="(val, key) in more_link" :key="key">
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
  @apply text-primary;
}

.flex_box {
  @apply flex;
}

.more_list {
  font-size: 12px;
  color: #9aa3ab;
}
</style>
