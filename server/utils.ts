import { IApiResponse } from '~~/types/api'

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
