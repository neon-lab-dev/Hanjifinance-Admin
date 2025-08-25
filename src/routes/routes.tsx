import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Emails from "../pages/Dashboard/Emails/Emails";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";

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
  {
    path: "dashboard",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "emails",
        element: <Emails />,
      },
      {
        path: "settings",
        element: <ChangePassword />,
      },
    ],
  },
]);