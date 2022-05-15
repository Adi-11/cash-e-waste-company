import React, { useContext, useEffect, useState } from "react";
import { AllProducts } from "./AllProducts";
import { Header } from "./Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ProductsContext from "../context/Products/Products.provider";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { getFilteredProducts, companies } = useContext<any>(ProductsContext);
  const [companyName, setCompanyName] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCompanyName(event.target.value);
  };

  useEffect(() => {
    getFilteredProducts(companyName);
  }, [companyName]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-between px-8">
        <p className="text-center my-4 font-bold text-3xl">
          All Product available
        </p>
        <div className="w-1/6">
          <FormControl sx={{ m: 1, width: "100%" }} size="small">
            <InputLabel id="demo-select-small">Filter by company</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={companyName}
              label="Filter by company"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {companies.map((company: any) => (
                <MenuItem value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <AllProducts />
    </>
  );
};
