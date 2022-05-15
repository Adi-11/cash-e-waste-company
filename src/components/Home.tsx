import React from "react";
import { AllProducts } from "./AllProducts";
import { Header } from "./Header";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <>
      <Header />

      <p className="text-center my-4 font-bold text-3xl">
        All Product available
      </p>
      <AllProducts />
    </>
  );
};
