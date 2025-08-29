import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import Categories from "../pages/Dashboard/Categories/Categories";
import Blogs from './../pages/Dashboard/Blogs/Blogs';

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
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "settings",
        element: <ChangePassword />,
      },
    ],
  },
]);