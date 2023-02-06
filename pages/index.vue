<script lang="ts" setup>
import { Ref } from 'vue'
import { ICategories } from '~~/server/api/categories'

const categories = inject('categories') as ICategories

const subTab: ICategories = [{ id: 0, name: '综合', slug: '' }, ...categories]

const isHeaderVisible = inject('isHeaderVisible') as Ref<boolean>

const route = useRoute()

watch(
  () => route.params,
  newVal => {
    const { slug } = newVal
    let _index = 0
    if (slug) {
      _index = subTab.findIndex(item => item.slug === slug)
      if (_index === -1) {
        navigateTo('/404')
        return
      }
    }

    useHead({
      title: subTab[_index].name,
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="header" :class="{ visible: isHeaderVisible }">
        <nav class="subtab">
          <NuxtLink
            v-for="item in subTab"
            :key="item.id"
            class="subtab-item"
            :to="item.slug ? `/nav-${item.slug}` : '/'"
          >
            {{ item.name }}
          </NuxtLink>
          <span> </span>
        </nav>
      </div>
    </div>
    <Aside :offset="40">
      <NuxtPage />
      <template #aside>
        <Ads />
        <AppGadget />
        <LeaderBoard />
        <Footer />
      </template>
      <template #asideFloat>
        <Ads />
        <AppGadget />
      </template>
    </Aside>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply bg-[#f4f5f5] dark:bg-[#333333] w-full h-auto pt-4;
}

.header-wrapper {
  @apply h-11;

  .header {
    @apply w-full h-11 flex justify-center;
    @apply bg-white dark:bg-[#121212];
    @apply border-b-1 border-gray-100 dark:border-[#494949];
    @apply fixed top-0 z-9;
    @apply transform-gpu transition-transform;
    @apply shadow-sm shadow-black/5 dark:shadow-white/5;

    &.visible {
      @apply translate-y-50px sm:translate-y-60px;
    }

    .subtab {
      @apply max-w-100vw w-972px h-full;
      @apply flex justify-start items-center gap-8;
      @apply px-2;
      @apply overflow-x-auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      .subtab-item {
        @apply text-14px sm:text-15px;
        @apply cursor-pointer;
        @apply text-black/80 dark:text-[#81878c];
        @apply whitespace-nowrap;

        &.router-link-exact-active,
        &:hover {
          @apply text-primary;
        }
      }
    }
  }
}
</style>
