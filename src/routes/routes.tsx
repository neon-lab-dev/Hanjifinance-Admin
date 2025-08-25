import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);