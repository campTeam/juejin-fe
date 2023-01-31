<script setup lang="ts">
const { data } = await useFetch('/api/global/nav')
const route = useRoute()

// 当前激活的导航项
const activeNav = computed(() => {
  return data
    .value!.data.filter(nav => nav.inSite)
    .find(nav => route.fullPath === nav.link)
})

const [isMobileNavShown, toggleMobileNav] = useToggle()

const isVisible = ref(true)

if (process.client) {
  const { directions, isScrolling, arrivedState } = useScroll(document)
  const checkHeaderStatus = useDebounceFn(
    (top: boolean, bottom: boolean, topArrived: boolean) => {
      if (topArrived) {
        // 当滚动到顶部时，避免因为safari的橡皮筋效果导致header闪烁
        // TODO: 按理说底部也需要判断，但是safari的高度计算存在问题，暂未想到如何解决
        isVisible.value = true
        return
      }
      if (top) {
        isVisible.value = true
      } else if (bottom) {
        isVisible.value = false
      }
    },
    100
  )
  watch(directions, () => {
    if (isScrolling.value) {
      checkHeaderStatus(directions.top, directions.bottom, arrivedState.top)
    }
  })
}
</script>

<template>
  <div class="header-wrapper">
    <header :class="{ visible: isVisible }">
      <div class="width-limit-wrapper">
        <div class="left">
          <NuxtLink class="logo" to="/">
            <Logo />
          </NuxtLink>
          <div class="main-nav-wrapper">
            <div
              class="mobile-nav"
              :class="{ 'mobile-shown': isMobileNavShown }"
              @click="toggleMobileNav()"
            >
              {{ activeNav?.label }}
              <IconsArrow class="icon" />
            </div>
            <div
              class="main-nav"
              :class="{ 'mobile-shown': isMobileNavShown }"
              @click="toggleMobileNav()"
            >
              <HeaderNavItem
                v-for="nav of data!.data"
                :key="nav.id"
                :label="nav.label"
                :link="nav.link"
                :badge="nav.badge || ''"
                :in-site="nav.inSite"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <ClientOnly>
            <UtilsDarkModeMonitor />
          </ClientOnly>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.header-wrapper {
  @apply h-50px sm:h-60px;
}

header {
  @apply fixed top-0 left-0 right-0 z-10;
  @apply h-50px sm:h-60px;
  @apply bg-white dark:bg-[#121212];
  @apply border-b-1 border-gray-200 dark:border-[#494949];

  @apply transform-gpu -translate-y-50px sm:-translate-y-60px transition-transform;

  &.visible {
    @apply translate-y-0;
  }

  .width-limit-wrapper {
    @apply mx-auto;
    @apply flex items-center justify-between;
    @apply px-12px;
    @apply max-w-1416px h-full;
  }

  .left,
  .right {
    @apply h-full;
    @apply flex items-center;
  }

  .logo {
    @apply h-22px;

    &:deep(.logo-text) {
      @apply dark:fill-[#e0e0e0];
      @apply hidden xs:block;
    }
  }

  .main-nav-wrapper {
    @apply h-full flex items-center;
    @apply ml-24px relative;

    .mobile-nav {
      @apply flex md:hidden;
      @apply text-primary items-center;
      @apply select-none cursor-pointer;

      .icon {
        @apply w-12px h-12px;
        @apply ml-1;
        @apply fill-[#515767] dark:fill-[#adb4c6];
        @apply transform-gpu transition-transform;
      }

      &.mobile-shown .icon {
        @apply rotate-180;
      }
    }

    .main-nav {
      @apply flex;
      @apply h-full;
      @apply gap-x-22px;
      @apply flex-col md:flex-row;

      @screen <md {
        @apply absolute top-49px left-16px p-2 h-auto;
        @apply border-1 border-gray-200 dark:border-[#494949] rounded-md;
        @apply shadow-xl shadow-black/10 dark:shadow-white/10;
        @apply transform-gpu transition origin-top;
        @apply -translate-x-1/2;
        @apply bg-white dark:bg-[#121212];
        @apply scale-y-50 opacity-0;
        @apply pointer-events-none;
        &:deep(.nav-item-wrapper) {
          @apply px-13;
        }
        &:deep(.nav-item) {
          @apply h-11;
        }
        &.mobile-shown {
          @apply scale-y-100 opacity-100;
          @apply pointer-events-auto;
        }
      }

      @screen <xs {
        @apply -left-65px translate-x-0;
        @apply rounded-l-none;
      }
    }
  }
}
</style>
