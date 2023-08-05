export type categorieType = string[]

export type reduxProductType = {
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
}

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

export type reduxProduct = {
  qty: number
  product: reduxProductType
}