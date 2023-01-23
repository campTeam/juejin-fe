<script setup lang="ts">
function readDarkModeInStorage() {
  const darkMode = localStorage.getItem('darkMode')
  const possibleValues = ['auto', 'dark', 'light']
  if (darkMode && possibleValues.includes(darkMode)) {
    return darkMode
  } else {
    return 'auto'
  }
}

const currentMode = ref(readDarkModeInStorage())
const preferredDark = usePreferredDark()

watchEffect(() => {
  if (currentMode.value === 'auto') {
    if (preferredDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else if (currentMode.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (currentMode.value === 'light') {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', currentMode.value)
})
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
