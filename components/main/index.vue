<script lang="ts" setup></script>

<template>
  <div class="main">
    <div class="aside-right">
      <slot></slot>
    </div>
    <div class="aside-left">
      <slot name="aside">
        <MainAside />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  max-width: 960px;
  height: 100%;
  background-color: rgb(244, 245, 245);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.aside-right {
  width: 700px;
  background-color: #ffffff;
  padding: 12px 20px;
}

.aside-left {
  width: 240px;
  background-color: rgb(244, 245, 245);
}
</style>
