import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as pages from "./pages";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
