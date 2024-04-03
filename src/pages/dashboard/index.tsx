import { getUserList } from "@/api/user";
import { Button } from "antd";
import { Outlet } from "react-router-dom";
import TestBuild from "./TestBuild";

export default function Dashboard() {
  const getList = () => {
    getUserList({ page: 1, pageSize: 10 });
  };
  return (
    <div className="h-1000px">
      <h1>Dashboard</h1>
      <TestBuild />
      <Button type="primary" onClick={getList}>
        获取用户列表
      </Button>
      <Outlet />
    </div>
  );
}
