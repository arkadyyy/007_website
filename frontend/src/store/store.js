import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Reducer } from "./reducer/reducer";

const middleware = [thunk];
const initialState = {
  test: "123",
  cartItems: [],
  products: [],
  tickets: [],
  cartCounter: {},
};

const store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
