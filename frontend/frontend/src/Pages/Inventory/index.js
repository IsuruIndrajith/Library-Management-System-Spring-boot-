import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, InputNumber, Button, Select, } from "antd";

function Inventory() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Book data:", values);
    // Here you’d send values to your backend API
    // fetch("/api/books", { method: "POST", body: JSON.stringify(values) })
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
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

function RemoveBook() {

  return (
    <div className="RemoveBook">
      <h2>Remove a Book</h2>
      <Form layout="vertical" autoComplete="off">
        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: "Please enter ISBN" }]}
        >
          <Input placeholder="9780134685991" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Remove Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function UpdateBook() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Book data:", values);
    // Here you’d send values to your backend API
    // fetch("/api/books", { method: "POST", body: JSON.stringify(values) })
  };
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Update a Book</h2>
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
            Update Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function SearchBook() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Search criteria:", values);
    // Here you’d send values to your backend API
    // fetch("/api/books/search", { method: "POST", body: JSON.stringify(values) })
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Search a Book</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="ISBN"
          name="isbn"
        >
          <Input placeholder="9780134685991" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
        >
          <Input placeholder="Effective Java" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
        >
          <Input placeholder="Joshua Bloch" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Search Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function GetAllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

const App = () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={Array.from({ length: 5 }).map((_, i) => {
      const id = String(i + 1);
      if (id === "1") {
        return {
          label: `Add a new Book`,
          key: id,
          children: <Inventory />,
        };
      } else if (id === "2") {
        return {
          label: `Remove a Book`,
          key: id,
          children: <RemoveBook />,
        };
      } else if (id === "3") {
        return {
          label: `Update Book Info`,
          key: id,
          children: <UpdateBook/>,
        };
      } else if (id === "4") {
        return {
          label: `Search a Book`,
          key: id,
          children: <SearchBook />,
        };
      } else if (id === "5") {
        return {
          label: `Get All Books`,
          key: id,
          children: <GetAllBooks />,
        };
      }
      return null;
    })}
  />
);


export default App;
