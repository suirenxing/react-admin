import Layout from "@/layout/default";
// import Dashboard from "@/pages/dashboard/dashboar";
import Login from "@/pages/login/Login";
import NotFound from "@/pages/system/404";
import { RouteObject, createBrowserRouter } from "react-router-dom";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const setRoutes = (authRoutes: RouteObject[]) => {
  routes[0].children = authRoutes;
  const router = createBrowserRouter(routes);
  return router;
};

export default setRoutes;
