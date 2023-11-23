import { Brand } from 'src/utils/types'

export type PrizeId = Brand<string, 'PrizeId'>

export interface Prize {
  description: string
  image_url: string
  title: string
  stock: number
  total: number
  codes_count: number
}
