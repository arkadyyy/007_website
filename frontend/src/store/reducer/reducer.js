const initalState = {
  cartItems: [],
  test2: null,
};

export const Reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "GET_ALL_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };
    default:
      return state;
  }
};
