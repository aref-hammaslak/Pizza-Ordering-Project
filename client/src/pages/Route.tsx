import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const navContents = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "About Us",
    path: "/aboute",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Route = () => {
  return (
    <>
      <div>
        <Header brandName="pizzaria" navContents={navContents} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Route;
