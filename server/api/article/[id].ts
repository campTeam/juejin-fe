import qs from 'qs'
import { apiResponse, getMediaLink } from '../../utils'
import type { IWriter } from '../global/meta'

import { parseMarkDown } from '~~/utils/markdown'

const { apiEntry } = useRuntimeConfig()

export interface IArticle {
  id: number
  title: string
  content: string
  summary: string
  writer: IWriter
  time: string
  tags: string[]
  image: string
}

export default defineEventHandler(async event => {
  const id = parseInt(event.context.params.id)

  if (isNaN(id)) {
    return apiResponse(null, -1, 'Invalid article id')
  }

  const query = qs.stringify({
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
  })

  try {
    const result = (await $fetch(`/api/articles/${id}?${query}`, {
      baseURL: apiEntry,
    })) as any
    return apiResponse<IArticle>({
      id: result.data.id,
      title: result.data.attributes.title,
      summary: result.data.attributes.summary,
      content: parseMarkDown(result.data.attributes.content),
      writer: {
        id: result.data.attributes.writer.data.id,
        name: result.data.attributes.writer.data.attributes.name,
        motto: result.data.attributes.writer.data.attributes.motto,
        avatar: getMediaLink(
          result.data.attributes.writer.data.attributes.avatar
        ),
      },
      time: result.data.attributes.time,
      tags: result.data.attributes.tags.map((tag: any) => tag.tag),
      image: result.data.attributes.image.data
        ? getMediaLink(result.data.attributes.image)
        : '',
    })
  } catch (e) {
    return apiResponse(null, -1, 'Article not found')
  }
})
