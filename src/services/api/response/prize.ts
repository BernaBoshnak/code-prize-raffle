import { Brand } from 'src/utils/types'

export type PrizeId = Brand<string, 'PrizeId'>

export interface Prize {
  description: string
  image_url: string
  title: string
  amount: number
  assigned_users_count: number
  codes_count: number
}
