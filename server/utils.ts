import { IApiResponse } from '~~/types/api'

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
