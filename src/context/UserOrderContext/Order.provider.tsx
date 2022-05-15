import { useSnackbar } from "notistack";
import React, { createContext, useContext, useReducer } from "react";
import { backendUrl } from "../../config";
import AuthContext from "../Authentication/Auth.provider";
import { OrderReducer } from "./Order.reducer";

export interface OrderStateType {
  orders: any[];
  loading: boolean;
}

const initialState = {
  orders: [],
  loading: true,
};

const OrderContext = createContext(initialState);

export default OrderContext;

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [state, dispatch] = useReducer(OrderReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const getAllOrders = async () => {
    dispatch({ type: "LOADING" });
    await fetch(`${backendUrl}/user-order/my`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        dispatch({ type: "ALL_ORDERS", payload: res.orders });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const addOrder = async (data: any) => {
    dispatch({ type: "LOADING" });

    const d = data.map((item: any) => {
      return {
        _id: item._id,
        quantity: item.quantity,
      };
    });
    let body = {
      items: [...d],
    };

    await fetch(`${backendUrl}/company-order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "ADD_ORDER", payload: res.order });
        enqueueSnackbar(
          "Order Placed Successfully! Our delivery partner will contact soon",
          {
            variant: "success",
          }
        );
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <OrderContext.Provider
      value={
        {
          ...state,
          getAllOrders,
          addOrder,
        } as any
      }
    >
      {children}
    </OrderContext.Provider>
  );
};
