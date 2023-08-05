import {ProductType, reduxProductType} from './types'

export interface ProductArrayInterface {
  products: ProductType
}

export interface searchClass {
  searchInput: string
  searchHandle: (e: any) => void
}

export interface reduxActionInterface {
  type: string
  payload: {
    product: reduxProductType
    qty: number
  }
}

export interface reduxInitialStateInterface {
  cartProducts: {
    product: reduxProductType
    qty: number
  }[]
}