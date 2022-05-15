export const ProductsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case "GET_COMPANIES":
      return {
        ...state,
        companies: action.payload,
        loading: false,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
