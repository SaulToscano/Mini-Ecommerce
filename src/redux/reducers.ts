import { combineReducers } from "redux";
import { reducer as productsReducer } from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer
})

export default rootReducer;