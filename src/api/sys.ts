import { defHttp } from "@/utils/request";

export interface Menu {
  id: number | string;
  title?: string;
  path: string;
  icon?: string | React.ReactNode;
  component?: string;
  redirect?: string;
  children?: Menu[];
  [index: number]: string;
}
export const getMenuLists = (params: Recordable) => {
  return defHttp.get({
    url: "/menu/list",
    params,
  });
};
export const getMenus = () => {
  return new Promise<Menu[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 2,
          title: "用户",
          path: "/user",
          icon: "UserOutlined",
          component: "/user/index.tsx",
        },
        {
          id: 1,
          title: "dashboard",
          path: "/dashboard",
          icon: "dashboard|svg",
          component: "/dashboard/index.tsx",
        },
        {
          id: 3,
          title: "系统管理",
          path: "/system",
          icon: "SettingOutlined",
          component: "layout",
          redirect: "/system/menu",
          children: [
            {
              id: 31,
              title: "菜单管理",
              path: "/system/menu",
              component: "/system/menu/index.tsx",
            },
            {
              id: 32,
              title: "角色管理",
              path: "/system/role",
              component: "/dashboard/index.tsx",
              children: [
                {
                  id: 321,
                  title: "角色列表",
                  path: "/system/role/list",
                  component: "/dashboard/index.tsx",
                },
              ],
            },
          ],
        },
      ]);
    }, 1000);
  });
};
