import { OrderStateType } from "./Order.provider";

export const OrderReducer = (state: OrderStateType, action: any) => {
  switch (action.type) {
    case "ALL_ORDERS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
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
