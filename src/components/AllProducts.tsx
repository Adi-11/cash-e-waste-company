import { CircularProgress, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ProductsContext from "../context/Products/Products.provider";
import ProductCard from "./Cards";

interface AllProductsProps {}

export const AllProducts: React.FC<AllProductsProps> = ({}) => {
  const { loading, products, getAllProducts } =
    useContext<any>(ProductsContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex items-center justify-center m-auto p-8">
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product: any) => (
            <Grid item lg={3} xs={12} sm={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
