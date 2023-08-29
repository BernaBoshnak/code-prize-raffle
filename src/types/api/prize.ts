export interface Prize {
  id: string
  description: string
  image: {
    url: string
    alt: string
  }
  title: string
  stock: number
  total: number
  codesCount: number
}
