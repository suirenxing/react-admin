import { MenuState, MenuType } from "@/enums/menuEnum";
import { Form, Input, InputNumber, Modal, Select } from "antd";
type Props = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  handleOk: (params: Recordable) => void;
};
type FieldType = {
  id?: number;
  /** 菜单 */
  name: string;
  /** 路径 */
  path: string;
  /** 组件 */
  component: string;
  /** 图标 */
  icon?: string;
  /** 类型 */
  type: MenuType;
  /** 父级菜单 */
  parentId?: number;
  /** 权限标识 */
  permission?: string;
  /** 排序 */
  sort?: number;
  /** 状态 */
  state: MenuState;
  /** 是否显示 */
  visible: boolean;
};
export default function CreateModal(props: Props) {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleOk = () => {
    const formInfo = form.getFieldsValue();
    console.log(formInfo);
    props.handleOk(formInfo);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="新建菜单"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="p-8">
          <Form {...layout} form={form}>
            <Form.Item<FieldType> label="菜单名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="上级菜单" name="parentId">
              <Select />
            </Form.Item>
            <Form.Item<FieldType> label="排序" name="sort">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item<FieldType> label="菜单路径" name="path">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="组件路径" name="component">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="图标" name="icon">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="类型" name="type">
              <Select options={[{ label: "菜单", value: 1 }]} />
            </Form.Item>
            <Form.Item<FieldType> label="权限标识" name="permission">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="状态" name="state">
              <Select
                options={[
                  { label: "启用", value: 1 },
                  { label: "禁用", value: 0 },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType> label="是否显示" name="visible">
              <Select options={[{ label: "是", value: true }]} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
