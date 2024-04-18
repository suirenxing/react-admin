import {
  Menu,
  createMenu,
  deleteMenu,
  getMenuLists,
  updateMenu,
} from "@/api/sys";
import PageWrapper from "@/components/Page/PageWrapper";
import { Button, Form, Input, Table, TableColumnsType, message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateModal from "./CreateModal";

export default function MenuManage() {
  const ignore = useRef(false);
  const [dataSource, setDataSource] = useState<Menu[]>([]);

  const getDataSource = (pramas: Recordable = {}) => {
    setLoading(true);
    getMenuLists({ page: 1, pageSize: 10, ...pramas })
      .then((result) => {
        setDataSource(result.records);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!ignore.current) {
      getDataSource();
    }
    return () => {
      ignore.current = true;
    };
  }, []);

  const columns: TableColumnsType<Menu> = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级菜单",
      dataIndex: "parentName",
      key: "parentName",
      ellipsis: true,
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
  const [rowData, setRowData] = useState<Menu>();
  const handleEdit = (data: Menu) => {
    setIsModalOpen(true);
    setRowData(data);
  };
  const actionColumn = {
    title: "操作",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: Menu) => (
      <div>
        <Button
          type="link"
          onClick={() => {
            handleEdit({ ...record });
          }}
        >
          编辑
        </Button>
        <Button
          type="link"
          danger
          onClick={async () => {
            setLoading(true);
            await deleteMenu(record.id!).finally(() => {
              setLoading(false);
              getDataSource();
            });
            message.success("删除成功");
          }}
        >
          删除
        </Button>
      </div>
    ),
    fixed: true,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOk = useCallback(async (params: Recordable) => {
    setIsModalOpen(false);
    setLoading(true);
    if (params.id) {
      await updateMenu(params).finally(() => setLoading(false));
    } else {
      await createMenu(params).finally(() => setLoading(false));
    }
    getDataSource();
  }, []);

  const [form] = Form.useForm();
  const query = () => {
    const formModel = form.getFieldsValue();
    getDataSource(formModel);
  };
  return (
    <PageWrapper>
      <div>
        <Form form={form} layout="inline">
          <Form.Item label="菜单名称" name="name">
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item label="上级菜单" name="parentId">
            <Input placeholder="请输入上级菜单" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => query()}>
              查询
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          新增
        </Button>
      </div>
      <Table
        columns={[...columns, actionColumn]}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        expandable={{ defaultExpandAllRows: true, expandRowByClick: true }}
      ></Table>
      <CreateModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        rowData={rowData}
      />
    </PageWrapper>
  );
}
