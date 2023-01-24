import { apiResponse } from '~~/server/utils'
import qs from 'qs'

interface IMeta {
  siteName: string
  favicon: string
  gadget: {
    id: number
    title: string
    subtitle: string
    link: string
  }
  leaderboard: {
    id: number
    name: string
    motto: string
  }[]
  ads: {
    id: number
    link: string
    summary: string
    thumbnail: string
  }[]
}

const { apiEntry } = useRuntimeConfig()

export default defineEventHandler(async () => {
  const query = qs.stringify(
    {
      populate: [
        'gadget.qrcode',
        'leaderboard.writer',
        'favicon',
        'ads.thumbnail',
        'siteName',
      ],
    },
    { encodeValuesOnly: true }
  )

  const result = (await $fetch(`/api/global?${query}`, {
    baseURL: apiEntry,
  })) as any

  return apiResponse<IMeta>({
    siteName: result.data.attributes.siteName,
    favicon: apiEntry + result.data.attributes.favicon.data.attributes.url,
    gadget: {
      ...result.data.attributes.gadget,
      qrcode:
        apiEntry + result.data.attributes.gadget.qrcode.data.attributes.url,
    },
    leaderboard: result.data.attributes.leaderboard.map((item: any) => {
      return {
        id: item.writer.id,
        name: item.writer.data.attributes.name,
        motto: item.writer.data.attributes.motto,
      }
    }),
    ads: result.data.attributes.ads.map((item: any) => {
      return {
        id: item.id,
        link: item.link,
        summary: item.summary,
        thumbnail: apiEntry + item.thumbnail.data.attributes.url,
      }
    }),
  })
})
