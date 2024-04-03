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
export const getMenus = () => {
  return new Promise<Menu[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 2,
          title: "用户",
          path: "/user",
          icon: "UserOutlined",
          component: "/user/user.tsx",
        },
        {
          id: 1,
          title: "dashboard",
          path: "/dashboard",
          icon: "dashboard|svg",
          component: "/dashboard/dashboar.tsx",
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
              component: "/user/user.tsx",
            },
            {
              id: 32,
              title: "角色管理",
              path: "/system/role",
              component: "/dashboard/dashboar.tsx",
            },
          ],
        },
      ]);
    }, 1000);
  });
};
