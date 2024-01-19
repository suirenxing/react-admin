import { Layout } from "antd";
import Header from "./header";
import Sider from "./sider";
import Content from "./content";
import { Outlet } from "react-router-dom";
import useAppStore from "@/store/module/appStore";

export default function DefaultLayout() {
  const { sideWidth } = useAppStore();
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={sideWidth}>
          <Sider />
        </Layout.Sider>
        <Layout.Content>
          <Content>
            <Outlet />
          </Content>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
