import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../context/Authentication/Auth.provider";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated, user, logout } = useContext<any>(AuthContext);
  return (
    <div className="h-9 px-14 py-8 w-full flex justify-end bg-primary shadow-sm rounded-b-sm">
      <div className="flex justify-between items-center h-full w-full">
        <div className="flex items-center justify-between">
          <p className="text-accent text-3xl font-extrabold mr-6">
            Cash-e-Waste
          </p>
          <Link to="/" className="mainTitle">
            <button
              className={
                "text-white text-md font-semibold hover cursor-pointer mr-4"
              }
            >
              Home
            </button>
          </Link>
          {isAuthenticated && user.permissions[0] === "*" && (
            <Link to="/admin" className="mainTitle">
              <button
                className={"text-white text-md font-semibold cursor-pointer"}
              >
                Manage Items
              </button>
            </Link>
          )}
        </div>

        <div className={" flex items-center justify-center text-primary"}>
          {isAuthenticated && (
            <>
              <p className="text-lg text-white">
                {user?.name ? user.name : user.email}
              </p>
              <ProfileMenu />
            </>
          )}
          {!isAuthenticated && (
            // login button
            <Link to="/login">
              <button className={"btn-home"}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
