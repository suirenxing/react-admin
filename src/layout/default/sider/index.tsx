import { Menu, MenuProps } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import useAppStore from "@/store/module/appStore";
export default function Sider() {
  const { sideWidth } = useAppStore();
  const items: MenuProps["items"] = [
    {
      label: "dashboard",
      key: "dashboard",
      icon: <MailOutlined />,
    },
    {
      label: "用户管理",
      key: "user",
      icon: <UserOutlined />,
    },
  ];
  return (
    <div>
      <Menu mode="inline" style={{ width: sideWidth }} items={items}></Menu>
    </div>
  );
}
