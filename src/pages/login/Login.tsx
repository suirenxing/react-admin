import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  userName: string;
  password: string;
};
export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const submit = () => {
    const formModel = form.getFieldsValue();
    console.log("submit", formModel);
    navigate("/dashboard");
  };
  return (
    <div>
      <div className="w-full h-350px flex justify-center mt-20">
        <Form form={form}>
          <Form.Item<FieldType> label="用户名：" name="userName">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="密码：" name="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={submit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
