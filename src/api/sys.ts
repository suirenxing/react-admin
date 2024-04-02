export interface Menu {
  id: number | string;
  title: string;
  path: string;
  icon: string | React.ReactNode;
  component: string;
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
          component: "/user/user",
        },
        {
          id: 1,
          title: "dashboard",
          path: "/dashboard",
          icon: "dashboard|svg",
          component: "/dashboard/dashboar",
        },
      ]);
    }, 1000);
  });
};
