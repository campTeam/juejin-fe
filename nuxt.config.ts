// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ['@vueuse/nuxt', 'nuxt-windicss'],
})
