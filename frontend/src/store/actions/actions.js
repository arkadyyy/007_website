export const getAllProducts = (products) => {
  return { type: "GET_ALL_PRODUCTS", payload: products };
};

export const getAllTickets = (tickets) => {
  return { type: "GET_ALL_TICKETS", payload: tickets };
};
