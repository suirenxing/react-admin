import { GetProp, Menu, MenuProps } from "antd";
import useAppStore from "@/store/module/appStore";
import userStore from "@/store/module/userStore";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
export default function Sider() {
  const { sideWidth } = useAppStore();
  const menus = userStore((state) => state.menus);
  type MenuItem = GetProp<MenuProps, "items">[number];
  const items: MenuItem[] = menus.map((menu) => {
    debugger;
    return {
      label: <Link to={menu.path}>{menu.title}</Link>,
      key: menu.id,
      icon: menu.icon,
    };
  });
  return (
    <div>
      <Menu mode="inline" style={{ width: sideWidth }} items={items}></Menu>
    </div>
  );
}
