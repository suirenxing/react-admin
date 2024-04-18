export enum MenuState {
  /** 启用 */
  OPEN = "OPEN",
  /** 禁用 */
  CLOSE = "CLOSE",
}
export const menuStateMap = new Map<MenuState, string>([
  [MenuState.OPEN, "启用"],
  [MenuState.CLOSE, "禁用"],
]);
/** 菜单类型 */
export enum MenuType {
  /** 目录 */
  CATALOG = "CATALOG",
  /** 菜单 */
  MENU = "MENU",
  /** 按钮 */
  BUTTON = "BUTTON",
}
export const menuTypeMap = new Map<MenuType, string>([
  [MenuType.CATALOG, "目录"],
  [MenuType.MENU, "菜单"],
  [MenuType.BUTTON, "按钮"],
]);
