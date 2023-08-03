export type categorieType = string[]

export type ProductType = {
  category: string
  description: string
  id: number
  image: string
  price: number
  title: string
  rating: {
    count: number
    rate: number
  }
}[]