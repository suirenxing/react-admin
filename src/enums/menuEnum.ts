export enum MenuState {
  /** 启用 */
  OPEN = 1,
  /** 禁用 */
  CLOSE = 0,
}
export const menuStateMap = new Map<MenuState, string>([
  [MenuState.OPEN, "启用"],
  [MenuState.CLOSE, "禁用"],
]);
/** 菜单类型 */
export enum MenuType {
  /** 目录 */
  CATALOG = 0,
  /** 菜单 */
  MENU = 1,
  /** 按钮 */
  BUTTON = 2,
}
export const menuTypeMap = new Map<MenuType, string>([
  [MenuType.CATALOG, "目录"],
  [MenuType.MENU, "菜单"],
  [MenuType.BUTTON, "按钮"],
]);
