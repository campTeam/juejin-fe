<script setup lang="ts">
function readDarkModeInStorage() {
  const darkMode = useCookie('darkMode')
  const possibleValues = ['auto', 'dark', 'light']
  if (darkMode.value && possibleValues.includes(darkMode.value)) {
    return darkMode.value
  } else {
    return 'auto'
  }
}

const currentMode = ref(readDarkModeInStorage())
const preferredDark = usePreferredDark()

watchEffect(() => {
  if (currentMode.value === 'auto') {
    if (preferredDark.value) {
      setModeClass(true)
    } else {
      setModeClass(false)
    }
  } else if (currentMode.value === 'dark') {
    setModeClass(true)
  } else if (currentMode.value === 'light') {
    setModeClass(false)
  }

  useCookie('darkMode').value = currentMode.value
})

function setModeClass(isDark: boolean): void {
  if (isDark) {
    useHead({
      htmlAttrs: { class: 'dark' },
      meta: [{ name: 'theme-color', content: '#121212' }],
    })
  } else {
    useHead({
      htmlAttrs: { class: '' },
      meta: [{ name: 'theme-color', content: '#ffffff' }],
    })
  }
}
</script>

<template>
  <select v-model="currentMode">
    <option value="auto">自动适应</option>
    <option value="dark">深色模式</option>
    <option value="light">浅色模式</option>
  </select>
</template>

<style scoped lang="scss">
select {
  @apply bg-primary;
  @apply text-[15px] text-white;
  @apply px-2 py-1.5;
  @apply border-none rounded-[0.25em];
  @apply outline-none cursor-pointer;
  @apply hover:bg-primary-dark;

  option {
    @apply bg-white text-gray;
    @apply dark:(bg-gray text-white);
  }
}
</style>
