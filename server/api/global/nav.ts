import { apiResponse } from '~~/server/utils'

interface INavItem {
  id: number
  label: string
  badge: string | null
  link: string
  inSite: boolean
}

const { apiEntry } = useRuntimeConfig()

export default defineEventHandler(async () => {
  const result = (await $fetch('/api/global?populate=nav', {
    baseURL: apiEntry,
  })) as any

  return apiResponse<INavItem[]>(result.data.attributes.nav)
})
