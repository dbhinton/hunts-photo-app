import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailReducer } from "./reducers/productReducers"
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer, 
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')? 
JSON.parse(localStorage.getItem('cartItems')) : []

const initalState = {
  cart: {cartItems: cartItemsFromLocalStorage}
};

const middleware = [thunk]

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
