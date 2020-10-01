import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
const Register = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");

  const handleLogin = (values) => {
    if (password !== passConf) {
      notification.warning({
        message: "Password and password confirmation does not   match",
      });
      if (password.length < 6) {
        notification.warning({
          message: "Password at least 6 digits",
        });
      }
      setPassword("");
      setPassConf("");
      return null;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });
    form.resetFields();
    router.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Create new user</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password conf"
          name="passConf"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassConf(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
