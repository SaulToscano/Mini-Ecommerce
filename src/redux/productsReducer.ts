import { reduxProductType } from '../interfaces/types'
import { reduxActionInterface, reduxInitialStateInterface } from '../interfaces/interface'

const initialState: reduxInitialStateInterface = {
  cartProducts: []
}

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT'

export const reducer = (state = initialState, action: reduxActionInterface) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const index = state.cartProducts.findIndex((product) => JSON.stringify(product.product) === JSON.stringify(action.payload.product))

      if (index !== -1) {
        const aux = [...state.cartProducts];
        aux[index].qty += 1;
        return {
          ...state,
          cartProducts: [...aux]
        }
      }

      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      }
    }
    case REMOVE_CART_PRODUCT: {
      const index = state.cartProducts.findIndex((product) => JSON.stringify(product.product) === JSON.stringify(action.payload.product))

      if(index !== -1) {
        const aux = state.cartProducts.filter((_, i) => i !== index);

        return {
          ...state,
          cartProducts: [...aux]
        }
      }

      return state;
    }
    default:
      return state;
  }
}

export const AddProduct = (newValue: reduxProductType) => {
  return ({
    type: ADD_PRODUCT_TO_CART,
    payload: {product: {...newValue}, qty: 1},
  })
}

export const RemoveProduct = (newValue: reduxProductType) => {
  return ({
    type: REMOVE_CART_PRODUCT,
    payload: {product: {...newValue}, qty: 0}
  })
}