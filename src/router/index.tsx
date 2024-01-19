import Layout from "@/layout/default";
import Dashboard from "@/pages/dashboard/dashboar";
import Login from "@/pages/login/Login";
import User from "@/pages/user/user";
import { createBrowserRouter } from "react-router-dom";
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
        element: <Dashboard />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);

export default router;
