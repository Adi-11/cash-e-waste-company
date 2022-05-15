import { CircularProgress, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { FaTruckPickup } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import ProductsContext from "../context/Products/Products.provider";
import OrderContext from "../context/UserOrderContext/Order.provider";
import ProductCard from "./Cards";

interface AllProductsProps {}

export const AllProducts: React.FC<AllProductsProps> = ({}) => {
  const { loading, products, getAllProducts } =
    useContext<any>(ProductsContext);
  const { addOrder } = useContext<any>(OrderContext);
  const [cartItem, setCartItem] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (product: any) => {
    setCartItem([...cartItem, { ...product, quantity: 1 }]);
  };

  const handleIncreaseProductCount = (id: string) => {
    const newCartItem = cartItem.map((item: any) => {
      if (item._id === id) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
        } else {
          enqueueSnackbar("Out of stock", { variant: "error" });
        }
      }
      return item;
    });
    setCartItem(newCartItem);
  };

  const handleDecreaseProductCount = (id: string) => {
    const newCartItem = cartItem.map((item: any) => {
      if (item._id === id) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItem(newCartItem);
  };

  const checkOut = () => {
    if (cartItem.length > 0) {
      console.log({ cartItem });
      addOrder(cartItem);
      setCartItem([]);
    } else {
      enqueueSnackbar("No items in cart", { variant: "error" });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center m-auto p-8 relative">
        <div className="fixed bottom-4 right-4 z-10">
          <button className={"btn-schedule"} onClick={() => checkOut()}>
            Checkout <FaTruckPickup size={20} className={"loader"} />
          </button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {products.map((product: any) => (
              <Grid item xs={12} sm={4} lg={3} key={product._id}>
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  handleIncreaseProductCount={handleIncreaseProductCount}
                  handleDecreaseProductCount={handleDecreaseProductCount}
                  cartItem={cartItem}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};
