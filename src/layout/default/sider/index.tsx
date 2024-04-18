import { GetProp, Menu, MenuProps } from "antd";
import useAppStore from "@/store/module/appStore";
import { Link } from "react-router-dom";
import type { Menu as IMenu } from "@/api/sys";
import { permissionStore } from "@/store/module/permission";

type MenuItem = GetProp<MenuProps, "items">[number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const transformMenu = (menus: IMenu[]): MenuItem[] => {
  return menus.map((menu) => {
    if (menu.children?.length) {
      // 如果是subMenu不使用<Link />，否则有样式问题
      return getItem(
        menu.name,
        menu.id!,
        menu.icon,
        transformMenu(menu.children)
      );
    }
    return getItem(
      <Link to={menu.path}>{menu.name}</Link>,
      menu.id!,
      menu.icon
    );
  });
};
export default function Sider() {
  const { sideWidth } = useAppStore();
  const menus = permissionStore((state) => state.menus);

  const items: MenuItem[] = transformMenu(menus);

  return (
    <div>
      <Menu mode="inline" style={{ width: sideWidth }} items={items}></Menu>
    </div>
  );
}
