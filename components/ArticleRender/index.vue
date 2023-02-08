<script setup lang="ts">
import type { ICatalogItem } from './types'

defineProps<{
  article: string
}>()

const emit = defineEmits<{
  (event: 'generate-catalog', payload: ICatalogItem[]): void
  (event: 'active-title', payload: string | null): void
}>()

const onScroll = throttleAndDebounce(checkActiveTitle, 100)

onMounted(() => {
  const articleContent = document.querySelector('.article-content')

  let minTitleLevel = 6

  if (articleContent) {
    const title = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const titleList: ICatalogItem[] = []

    title.forEach(item => {
      const level = Number(item.tagName.replace('H', ''))
      if (level < minTitleLevel) minTitleLevel = level
    })

    title.forEach(item => {
      const level = Number(item.tagName.replace('H', ''))
      const titleItem: ICatalogItem = {
        key: item.id,
        title: (item as HTMLElement).innerText,
        level: level - minTitleLevel,
      }
      titleList.push(titleItem)
    })

    emit('generate-catalog', titleList)

    requestAnimationFrame(checkActiveTitle)
    window.addEventListener('scroll', onScroll)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function checkActiveTitle() {
  const articleContent = document.querySelector('.article-content')
  if (articleContent) {
    const titles = [
      ...articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ] as HTMLHeadingElement[]

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

    if (titles.length && isBottom) {
      emit('active-title', titles[titles.length - 1].id)
      return
    }

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i]
      const nextTitle = titles[i + 1]

      const [isActive, id] = isTitleActive(i, title, nextTitle)

      if (isActive) {
        emit('active-title', id)
        return
      }
    }
  }
}

function getTitleTop(title: HTMLHeadingElement): number {
  return title.offsetTop - 10
}

function isTitleActive(
  index: number,
  title: HTMLHeadingElement,
  nextTitle: HTMLHeadingElement | undefined
): [boolean, string | null] {
  const scrollTop = window.scrollY

  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }

  if (scrollTop < getTitleTop(title)) {
    return [false, null]
  }

  if (!nextTitle || scrollTop < getTitleTop(nextTitle)) {
    return [true, title.id]
  }

  return [false, null]
}
</script>

<!-- TODO: 之后可能要测试一下会不会被xss攻击 -->
<template>
  <div class="article-content" v-html="article"></div>
</template>

<style lang="scss">
@import './hl-light.scss';
@import './hl-dark.scss';

.article-content {
  .hljs {
    @apply relative;
    &::before {
      content: attr(lang);
      @apply absolute top-2 right-2;
      @apply text-xs text-[#999];
    }
  }

  blockquote {
    @apply bg-[#f8f8f8] dark:bg-[#202020];
    @apply border-l-4 border-[#cbcbcb] dark:border-[#777777];
    @apply text-[#666666] dark:text-[#999999];
    @apply mx-0 my-22px px-23px py-1px;
  }

  a {
    @apply underline-1 underline;
    @apply text-primary text-opacity-80;

    &:hover {
      @apply text-opacity-100;
    }
  }

  h1 {
    @apply text-2xl font-bold;
  }

  h2 {
    @apply text-xl font-bold;
  }

  h3 {
    @apply text-lg font-bold;
  }

  h4 {
    @apply text-base font-bold;
  }

  h5 {
    @apply text-base font-bold;
  }

  h6 {
    @apply text-base font-bold;
  }

  code.inline-code {
    @apply font-serif !important;
    @apply bg-[#fff5f5] text-[#ff502c] dark:(bg-[#261f1f] text-[#cf251f]);
    @apply px-1 py-0.5 rounded-md text-15px;
  }

  table {
    @apply inline-block text-12px w-auto max-w-full;
    @apply overflow-auto border-collapse;
    @apply border border-[#cbcbcb] dark:border-[#777777];

    thead {
      @apply text-black text-14px;
      @apply bg-[#e7e7e7] dark:bg-[#2a2a2a];
    }

    td {
      @apply min-w-120px;
    }

    th {
      @apply text-[#666666] dark:text-[#999999];
    }

    td,
    th {
      @apply p-8px leading-24px;
      @apply border border-[#cbcbcb] dark:border-[#777777];
    }

    tr:nth-child(2n) {
      @apply bg-[#f8f8f8] dark:bg-[#202020];
    }

    tr:hover {
      @apply bg-[#f0f0f0] dark:bg-[#303030];
    }
  }
}
</style>
