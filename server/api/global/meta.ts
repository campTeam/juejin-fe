import { apiResponse, getMediaLink } from '~~/server/utils'
import qs from 'qs'

export interface ILevel {
  levelNo: number
  disImg: string
}

export interface IWriter {
  id: number
  name: string
  avatar: string
  motto: string
  level: number
}

export interface IMeta {
  siteName: string
  favicon: string
  gadget: {
    id: number
    title: string
    subtitle: string
    link: string
    qrcode: string
  }
  leaderboard: IWriter[]
  level: ILevel[]
  ads: {
    id: number
    link: string
    summary: string
    thumbnail: string
  }[]
  defaultSEO: {
    keywords: string
    description: string
  }
}

const { apiEntry } = useRuntimeConfig()

export default defineEventHandler(async () => {
  const query = qs.stringify(
    {
      populate: [
        'gadget.qrcode',
        'leaderboard.writer',
        'leaderboard.writer.avatar',
        'level.level',
        'level.level.disImg',
        'favicon',
        'ads.thumbnail',
        'siteName',
        'defaultSEO',
      ],
    },
    { encodeValuesOnly: true }
  )

  const result = (await $fetch(`/api/global?${query}`, {
    baseURL: apiEntry,
  })) as any

  return apiResponse<IMeta>({
    siteName: result.data.attributes.siteName,
    favicon: getMediaLink(result.data.attributes.favicon),
    gadget: {
      ...result.data.attributes.gadget,
      qrcode: getMediaLink(result.data.attributes.gadget.qrcode),
    },
    leaderboard: result.data.attributes.leaderboard.map((item: any) => {
      return {
        id: item.writer.id,
        name: item.writer.data.attributes.name,
        motto: item.writer.data.attributes.motto,
        avatar: getMediaLink(item.writer.data.attributes.avatar),
        level: item.writer.data.attributes.level,
      }
    }),
    level: result.data.attributes.level.map((item: any) => {
      return {
        levelNo: item.level.data.attributes.levelNo,
        disImg: getMediaLink(item.level.data.attributes.disImg),
      }
    }),
    ads: result.data.attributes.ads.map((item: any) => {
      return {
        id: item.id,
        link: item.link,
        summary: item.summary,
        thumbnail: getMediaLink(item.thumbnail),
      }
    }),
    defaultSEO: {
      keywords: result.data.attributes.defaultSEO.keywords,
      description: result.data.attributes.defaultSEO.description,
    },
  })
})
