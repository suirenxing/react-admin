import Layout from "@/layout/default";
// import Dashboard from "@/pages/dashboard/dashboar";
import Login from "@/pages/login/Login";
import User from "@/pages/user/user";
import NotFound from "@/pages/system/404";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        Component: lazy(() => import("@/pages/dashboard/dashboar")),
        children: [
          {
            path: "test",
            element: <User />,
          },
        ],
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
