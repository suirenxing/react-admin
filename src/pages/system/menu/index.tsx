import { getMenuLists } from "@/api/sys";
import PageWrapper from "@/components/Page/PageWrapper";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";

export default function MenuManage() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getMenuLists({}).then((result) => {
      setDataSource(result.records);
    });
  }, []);

  const columns = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级菜单",
      dataIndex: "parentId",
      key: "parentId",
    },
    {
      title: "菜单路由",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "组件路径",
      dataIndex: "component",
      key: "component",
    },
    {
      title: "菜单图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "菜单描述",
      dataIndex: "description",
      key: "description",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = (params: Recordable) => {
    console.log(params);
    setIsModalOpen(false);
  };
  return (
    <PageWrapper>
      <div>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          新增
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey="id"></Table>
      <CreateModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
      />
    </PageWrapper>
  );
}
