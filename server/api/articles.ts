import qs from 'qs'
import { apiResponse, getMediaLink, getThumbnailLink } from '../utils'
import type { IWriter } from './global/meta'

const { apiEntry } = useRuntimeConfig()

interface IArticleListItem {
  id: number
  title: string
  summary: string
  writer: IWriter
  time: string
  tags: string[]
  isAd: boolean
  thumbnail: string
}

export type IArticleList = IArticleListItem[]

export default defineEventHandler(async event => {
  let page = parseInt(getQuery(event).page?.toString() || '1')
  let category = parseInt(getQuery(event).cate?.toString() || '0')

  if (isNaN(category)) {
    category = 0
  }

  if (isNaN(page) || page < 1) {
    page = 1
  }

  const filters: any = {}
  if (category) {
    filters.category = {
      id: {
        $eq: category,
      },
    }
  }

  const query = qs.stringify(
    {
      filters,
      fields: ['id', 'title', 'summary', 'time', 'isAd'],
      populate: {
        tags: '*',
        writer: {
          fields: ['name', 'motto'],
          populate: {
            avatar: {
              fields: ['url'],
            },
          },
        },
        image: '*',
      },
      pagination: {
        page,
        pageSize: 10,
      },
    },
    { encodeValuesOnly: true }
  )

  const result = (await $fetch(`/api/articles?${query}`, {
    baseURL: apiEntry,
  })) as any

  return apiResponse<IArticleList>(
    result.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      summary: item.attributes.summary,
      isAd: item.attributes.isAd,
      time: item.attributes.time,
      tags: item.attributes.tags.map((tag: any) => tag.tag),
      writer: {
        id: item.attributes.writer.data.id,
        name: item.attributes.writer.data.attributes.name,
        motto: item.attributes.writer.data.attributes.motto,
        avatar: getMediaLink(item.attributes.writer.data.attributes.avatar),
      },
      thumbnail: item.attributes.image.data
        ? getThumbnailLink(item.attributes.image)
        : '',
    }))
  )
})
