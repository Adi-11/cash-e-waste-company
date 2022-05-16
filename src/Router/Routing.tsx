import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/Home";
import { Profile } from "../components/Profile";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
