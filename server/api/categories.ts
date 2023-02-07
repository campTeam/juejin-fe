import qs from 'qs'
import { apiResponse } from '../utils'

const { apiEntry } = useRuntimeConfig()

export interface ICategoryItem {
  id: number
  name: string
  slug: string
}

export type ICategories = ICategoryItem[]

export default defineEventHandler(async () => {
  const query = qs.stringify(
    {
      populate: '*',
    },
    { encodeValuesOnly: true }
  )

  const result = (await $fetch(`/api/categories?${query}`, {
    baseURL: apiEntry,
  })) as any

  return apiResponse<ICategories>(
    result.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      slug: item.attributes.slug,
    }))
  )
})
