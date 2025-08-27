import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

function Inventory() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Book data:", values);
    // Here you’d send values to your backend API
    // fetch("/api/books", { method: "POST", body: JSON.stringify(values) })
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Add a Book</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: "Please enter ISBN" }]}
        >
          <Input placeholder="9780134685991" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter book title" }]}
        >
          <Input placeholder="Effective Java" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please enter author" }]}
        >
          <Input placeholder="Joshua Bloch" />
        </Form.Item>

        <Form.Item
          label="Publisher"
          name="publisher"
          rules={[{ required: true, message: "Please enter publisher" }]}
        >
          <Input placeholder="Addison-Wesley" />
        </Form.Item>

        <Form.Item
          label="Year Published"
          name="year_published"
          rules={[{ required: true, message: "Please enter year" }]}
        >
          <InputNumber min={1500} max={2100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please select genre" }]}
        >
          <Select placeholder="Select genre">
            <Select.Option value="Programming">Programming</Select.Option>
            <Select.Option value="Science">Science</Select.Option>
            <Select.Option value="Fiction">Fiction</Select.Option>
            <Select.Option value="History">History</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Total Copies"
          name="copies_total"
          rules={[{ required: true, message: "Enter total copies" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Copies Available"
          name="copies_available"
          rules={[{ required: true, message: "Enter available copies" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Inventory;
