import { ReactNode } from "react";

export interface Menu {
  id: number | string;
  title: string;
  path: string;
  icon: string | ReactNode;
  component: string;
  children?: Menu[];
  [index: number]: string;
}
export const getMenus = () => {
  return new Promise<Menu[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "dashboard",
          path: "/dashboard",
          icon: "dashboard1cc",
          component: "/dashboard/dashboar",
        },
        // {
        //   id: 2,
        //   title: "用户",
        //   path: "/user",
        //   icon: "user",
        //   component: "/user/user",
        // },
      ]);
    }, 1000);
  });
};
