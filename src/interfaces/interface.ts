import {ProductType} from './types'

export interface ProductArrayInterface {
  products: ProductType
}

export interface searchClass {
  searchInput: string
  searchHandle: (e: any) => void
}