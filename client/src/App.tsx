import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as pages from "./pages";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import axios from "axios";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <pages.Signup />,
  },
  {
    path: "/",
    element: <pages.Route />,
    children: [
      {
        path: "/",
        element: <pages.Home />,
      },
      {
        path: "/aboute",
        element: <pages.About />,
      },
      {
        path: "/contact",
        element: <pages.Contact />,
      },
      {
        path: "/menu",
        element: <pages.Menu />,
      },
    ],
  },
  {
    path: "/login",
    element: <pages.Login />,
  },
]);


type User = {
  id:number
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type OverallState = {
  isCartOpen: boolean;
  user: User | undefined;
  userToken: string | undefined;
  isLoggedIn: boolean;
};

export type OverallStateContextType = {
  overallState: OverallState;
  setOverallState: React.Dispatch<React.SetStateAction<OverallState>>;
};

const ovrallStatContext = createContext<OverallStateContextType>({
  overallState: {
    isCartOpen: false,
    user: undefined,
    userToken: undefined,
    isLoggedIn:false
  },
  setOverallState: () => {},
});

function App() {

  const [overallState, setOverallState] = useState<OverallState>({
    isCartOpen: false,
    user: undefined,
    userToken: undefined,
    isLoggedIn: false
  });


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ovrallStatContext.Provider value={{ overallState, setOverallState }}>
          <RouterProvider router={router} />
        </ovrallStatContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
export{
  ovrallStatContext
}