export interface IApiResponse<T> {
  code: number
  msg: string
  data: T
}
