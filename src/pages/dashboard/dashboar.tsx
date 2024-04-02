import { getUserList } from "@/api/user";
import { Button } from "antd";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const getList = () => {
    getUserList({ page: 1, pageSize: 10 });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={getList}>
        获取用户列表
      </Button>
      <Outlet />
    </div>
  );
}
