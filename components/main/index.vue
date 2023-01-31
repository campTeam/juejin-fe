<script lang="ts" setup></script>

<template>
  <div class="main">
    <div class="aside_right">
      <div v-for="(item, index) in 100" :key="index">文章列表{{ item }}</div>
    </div>
    <div class="aside_left">
      <MainAside />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  max-width: 960px;
  height: 100%;
  background-color: rgb(244, 245, 245);
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.aside_right {
  width: 700px;
  background-color: #ffffff;
  padding: 12px 20px;
}

.aside_left {
  width: 240px;
  background-color: rgb(244, 245, 245);
}
</style>
