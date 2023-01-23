import { apiResponse } from '~~/server/utils'

interface INavItem {
  id: number
  label: string
  badge: string | null
  link: string
  inSite: boolean
}

interface IOriginNavResponse {
  data: {
    id: number
    attributes: {
      nav: INavItem[]
      siteName: string
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }
}

const { apiEntry } = useRuntimeConfig()

export default defineEventHandler(async () => {
  const result: IOriginNavResponse = await $fetch('/api/global?populate=nav', {
    baseURL: apiEntry,
  })

  return apiResponse<INavItem[]>(result.data.attributes.nav)
})
