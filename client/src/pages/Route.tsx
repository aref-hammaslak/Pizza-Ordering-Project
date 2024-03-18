import React, { createContext, useState } from "react";
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

type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type OverallState = {
  isCartOpen: boolean,
  user: User | undefined;
  userToken: string | undefined;

}

type OverallStateContextType = {
  overallState: OverallState;
  setOverallState: React.Dispatch<React.SetStateAction<OverallState>>;
}

const ovrallStatContext = createContext<OverallStateContextType>(null as never);

const Route = () => {

  const [overallState , setOverallState] = useState<OverallState>({
    isCartOpen: false,
    user: undefined,
    userToken: undefined,
  });
  

  return (
    <>
    <ovrallStatContext.Provider value={{overallState, setOverallState}}>
      <div>
        <Header brandName="pizzaria" navContents={navContents} />
      </div>
      <div>
        <Outlet />
      </div>
    </ovrallStatContext.Provider>
      
    </>
  );
};




export default Route;
export{
  ovrallStatContext
}
