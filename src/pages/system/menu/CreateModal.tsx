import { Menu, getMenuLists } from "@/api/sys";
import ApiSelect from "@/components/Form/ApiSelect";
import { MenuState, MenuType } from "@/enums/menuEnum";
import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { memo, useEffect } from "react";
type Props = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  handleOk: (params: Recordable) => void;
  rowData?: Menu;
};
type FieldType = Menu;
const CreateModal: React.FC<Props> = memo((props: Props) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleOk = async () => {
    const formInfo = await form.validateFields();
    console.log(formInfo);
    if (props.rowData?.id) {
      props.handleOk({ ...formInfo, id: props.rowData.id });
    } else {
      props.handleOk(formInfo);
    }
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  /** 重置 */
  useEffect(() => {
    if (props.isModalOpen) {
      form.resetFields();
    }
  }, [form, props.isModalOpen]);
  /** 根据数据初始化Form */
  useEffect(() => {
    if (props.rowData) {
      form.setFieldsValue(props.rowData);
    }
  }, [form, props.rowData]);
  /** 初始化form默认值 */
  const initialValues: Partial<FieldType> = {
    type: MenuType.MENU,
    status: MenuState.OPEN,
    visible: true,
  };

  return (
    <>
      <Modal
        title="新建菜单"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <div className="p-8">
          <Form {...layout} form={form} initialValues={initialValues}>
            <Form.Item<FieldType>
              label="类型"
              name="type"
              rules={[{ required: true }]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  { label: "菜单", value: MenuType.MENU },
                  { label: "按钮", value: MenuType.BUTTON },
                  { label: "目录", value: MenuType.CATALOG },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="菜单名称"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item<FieldType> label="上级菜单" name="parentId">
              <ApiSelect
                placeholder="请选择上级菜单"
                api={getMenuLists}
                params={{ page: 1, pageSize: 10 }}
                labelField="name"
              />
            </Form.Item>
            <Form.Item<FieldType> label="排序" name="sort">
              <InputNumber
                min={1}
                placeholder="请输入排序"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="菜单路径"
              name="path"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入菜单路径" />
            </Form.Item>
            <Form.Item<FieldType>
              label="组件路径"
              name="component"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入组件路径" />
            </Form.Item>
            <Form.Item<FieldType> label="图标" name="icon">
              <Input placeholder="请输入图标" />
            </Form.Item>

            <Form.Item<FieldType> label="权限标识" name="permission">
              <Input placeholder="请输入权限标识" />
            </Form.Item>
            <Form.Item<FieldType>
              label="状态"
              name="status"
              rules={[{ required: true }]}
            >
              <Radio.Group
                options={[
                  { label: "启用", value: MenuState.OPEN },
                  { label: "禁用", value: MenuState.CLOSE },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType> label="是否显示" name="visible">
              <Radio.Group
                options={[
                  { label: "是", value: true },
                  { label: "否", value: false },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType> label="描述" name="description">
              <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
});
export default CreateModal;
