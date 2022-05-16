import React, { useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderProvider from "../context/UserOrderContext/Order.provider";
import { CircularProgress } from "@mui/material";
import OrderItems from "./OrderItems";
import { Header } from "./Header";

export const Profile = () => {
  const { getAllOrders, orders, loading } = useContext<any>(OrderProvider);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="m-5">
        {loading ? (
          <div className=" flex items-center justify-center h-screen m-auto">
            <CircularProgress
              size={50}
              color={"inherit"}
              className={"loader"}
            />
          </div>
        ) : (
          <>
            <div className="text-center m-2">
              <Typography variant="h4">My Orders</Typography>
            </div>
            {orders.map((order: any) => {
              return (
                <Accordion defaultExpanded key={order._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="flex flex-row justify-between w-full">
                      <Typography>
                        <span className="font-bold text-primary">
                          Booked on :
                        </span>{" "}
                        {order.createdAt.substring(0, 10)}
                      </Typography>
                      <Typography>
                        <span className="font-bold text-primary">
                          Transaction Id:
                        </span>{" "}
                        {order.orderId}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <OrderItems items={order.items} />
                    <div className="flex flex-row justify-end mt-4">
                      <Typography>
                        <span className="font-bold text-primary ">
                          Status:{" "}
                        </span>{" "}
                        {order.status}
                      </Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
