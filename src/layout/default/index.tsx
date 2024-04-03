import { Layout, Spin } from "antd";
import Header from "./header";
import Sider from "./sider";
import Content from "./content";
import { Outlet } from "react-router-dom";
import useAppStore from "@/store/module/appStore";
import { Suspense } from "react";

export default function DefaultLayout() {
  const { sideWidth } = useAppStore();
  return (
    <Layout style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={sideWidth}>
          <Sider />
        </Layout.Sider>
        <Layout.Content className="h-full overflow-y-auto">
          <Suspense fallback={<Spin size="large"></Spin>}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
