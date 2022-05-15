import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/Home";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
