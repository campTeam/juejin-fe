import type { IApiResponse } from '~~/types/api'

const {
  public: { apiEntry: publicAPIEntry },
} = useRuntimeConfig()

export function apiResponse<T>(
  data: T,
  code: number = 200,
  msg: string = 'ok'
): IApiResponse<T> {
  return {
    code,
    msg,
    data,
  }
}

export function getMediaLink(mediaObj: any): string {
  return publicAPIEntry + mediaObj.data.attributes.url
}

export function getThumbnailLink(mediaObj: any): string {
  if (
    mediaObj.data.attributes.formats &&
    mediaObj.data.attributes.formats.thumbnail
  ) {
    return publicAPIEntry + mediaObj.data.attributes.formats.thumbnail.url
  } else {
    return getMediaLink(mediaObj)
  }
}
