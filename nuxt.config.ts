// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ['@vueuse/nuxt', 'nuxt-windicss'],
  css: ['~/assets/scss/global.scss'],
  runtimeConfig: {
    apiEntry: process.env.NUXT_API_ENTRY || 'https://juejin-cms.daidr.me',
  },
})
