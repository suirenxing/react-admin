import { MenuState, MenuType } from "@/enums/menuEnum";
import { defHttp } from "@/utils/request";
import React from "react";

export interface Menu {
  id?: string | number;
  /** 菜单 */
  name: string;
  /** 路径 */
  path: string;
  /** 重定向 */
  redirect?: string;
  /** 组件 */
  component: string;
  /** 图标 */
  icon?: string | React.ReactNode;
  /** 类型 */
  type: MenuType;
  /** 父级菜单 */
  parentId?: number;
  /** 权限标识 */
  permission?: string;
  /** 排序 */
  sort?: number;
  /** 状态 */
  status: MenuState;
  /** 是否显示 */
  visible: boolean;
  [index: string]: any;
}
/** 获取菜单列表 */
export const getMenuLists = (params: Recordable) => {
  return defHttp.get<{ records: Menu[] }>({
    url: "/menu/list",
    params,
  });
};
/** 新建菜单 */
export const createMenu = (params: Recordable) => {
  return defHttp.post<Menu>({
    url: "/menu/create",
    params,
  });
};
/** 更新菜单 */
export const updateMenu = (params: Recordable) => {
  return defHttp.put<Menu>({
    url: `/menu/${params.id}`,
    params,
  });
};
/** 删除菜单 */
export const deleteMenu = (id: string | number) => {
  return defHttp.delete<Menu>({
    url: `/menu/${id}`,
  });
};

/** 获取用户权限菜单 */
export const getUserMenus = (params: Recordable) => {
  return defHttp.get<Menu[]>({
    url: "/menu/listWithPermission",
    params,
  });
};
