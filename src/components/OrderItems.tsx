import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface ProfileProps {
  items: any;
}

const OrderItems: React.FC<ProfileProps> = ({ items }) => {
  return (
    <>
      {items.map((item: any) => {
        return (
          <Card variant="outlined">
            <CardContent>
              <Typography>
                <span className="font-bold text-primary">Item:</span>{" "}
                {item.itemName}
              </Typography>
              <Typography>
                <span className="font-bold text-primary">Quantity:</span>{" "}
                {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default OrderItems;
