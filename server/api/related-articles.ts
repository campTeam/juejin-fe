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
  const tags = getQuery(event).tags

  if (tags instanceof Array) {
    if (
      !tags.length ||
      tags.length > 5 ||
      tags.some((tag: any) => typeof tag !== 'string')
    ) {
      return apiResponse<IArticleList>([])
    }
  }

  const id = parseInt(getQuery(event).id as string)

  if (isNaN(id)) {
    return apiResponse<IArticleList>([])
  }

  const filters: any = {
    $and: [
      {
        tags: {
          tag: {
            $in: tags,
          },
        },
      },
      {
        id: {
          $ne: id,
        },
      },
    ],
  }

  const query = qs.stringify(
    {
      sort: ['id:desc'],
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
        page: 1,
        pageSize: 5,
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
