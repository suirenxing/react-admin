import { Menu, getUserMenus } from "@/api/sys";
import Icon from "@/components/Icon";
import setRoutes from "@/router";
import { transformRoute } from "@/router/useRouteHelp";
import { permissionStore } from "@/store/module/permission";
import { cloneDeep } from "lodash-es";
import React, { useEffect, useRef, useState } from "react";

export function addIconToMenu(menus: Menu[]) {
  menus.forEach((item) => {
    if (item.icon) {
      item.icon = React.createElement(Icon, {
        icon: item.icon as string,
        prefix: "icon",
      });
    }
    if (item.children) {
      addIconToMenu(item.children);
    }
  });
  return menus;
}
export function transformMenu(menus: Menu[]) {
  return addIconToMenu(menus);
}

export default function useMenu() {
  const [loading, setLoading] = useState(true);
  const setMenus = permissionStore((state) => state.setMenus);

  const router = useRef<ReturnType<typeof setRoutes>>();

  useEffect(() => {
    let ignore = false;
    getUserMenus({}).then((result) => {
      if (!ignore) {
        // 设置菜单
        setMenus(addIconToMenu(cloneDeep(result)));
        // 转换路由
        const dynamicRoutes = transformRoute(cloneDeep(result));
        router.current = setRoutes(dynamicRoutes);
        setLoading(false);
      }
    });
    // 取消依赖，防止多次执行
    return () => {
      ignore = true;
    };
  }, []);
  return { loading, router };
}
export const testRender = () => {
  console.log("render");
};
