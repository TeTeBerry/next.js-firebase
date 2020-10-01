import React, { useState } from "react";
import fire from "../config/fire-config";
import { Form, Input, notification, Button } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreatePost = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (values) => {
    console.log({
      title: title,
      content: content,
    });
    fire.firestore().collection("blog").add({
      title: title,
      content: content,
    });

    notification.success({
      message: "Blogpost created",
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2>Add Blog</h2>

      <Form
        form={form}
        {...layout}
        name="basic"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Title" name="title">
          <Input onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <Input.TextArea onChange={(e) => setContent(e.target.value)} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreatePost;
