import { Menu } from "@/api/sys";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
const modules = import.meta.glob("../pages/**/*.tsx");
const components = Object.keys(modules).reduce<Record<string, any>>(
  (pre, cur) => {
    pre[cur.replace("../pages", "")] = modules[cur];
    return pre;
  },
  {}
) as Record<string, any>;
export function transformRoute(
  menus: Menu[],
  routes: RouteObject[] = []
): RouteObject[] {
  menus.forEach((menu) => {
    let route: Recordable;
    // 如果有重定向，直接返回
    if (menu.redirect) {
      route = {
        path: menu.path,
        element: <Navigate to={menu.redirect} />,
      };
    } else {
      route = {
        path: menu.path,
        Component: lazy(components[menu.component!]),
      };
    }
    routes.push(route);
    // 递归子路由, 所有子路由平铺到同一children
    if (menu.children) {
      transformRoute(menu.children, routes);
    }
  });
  return routes;
}
