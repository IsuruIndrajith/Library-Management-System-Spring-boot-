import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, InputNumber, Button, Select, message } from "antd";
import { addBook, updateBook, deleteBook, searchBook, getAllBooks } from "../../API";


function Inventory() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);

  // ✅ AntD message hook
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const res = await addBook(values);
      if (res.data.code === "00") {
        messageApi.open({
          type: "success",
          content: "📚 Book added successfully!",
          className: "custom-class",
          style: {
            marginTop: "15vh", // move down from top
          },
        });

        form.resetFields();
        setBooks((prev) => [...prev, res.data.content]);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.message || "Failed to add book",
          style: { marginTop: "15vh" },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: "❌ Error adding book.",
        style: { marginTop: "15vh" },
      });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
       {/* ✅ must render this once */}
      {contextHolder}
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
            <Select.Option value="Biography">Biography</Select.Option>
            <Select.Option value="Fantasy">Fantasy</Select.Option>
            <Select.Option value="Artificial Intelligence">Artificial Intelligence</Select.Option>
            <Select.Option value="Software Engineering">Software Engineering</Select.Option>
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
  const [form] = Form.useForm();

  // ✅ AntD v5 message hook
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const res = await deleteBook(values.book_id); // make sure backend expects book_id
      if (res.data.code === "00") {
        messageApi.open({
          type: "success",
          content: "🗑️ Book removed successfully!",
          style: {
            marginTop: "15vh",
          },
        });
        form.resetFields();
      } else {
        messageApi.open({
          type: "error",
          content: res.data.message || "⚠️ Failed to remove book.",
          style: {
            marginTop: "15vh",
          },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: "❌ Error removing book.",
        style: {
          marginTop: "15vh",
        },
      });
    }
  };


  return (
    <div className="RemoveBook" style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* ✅ Required for the message system */}
      {contextHolder}
      <h2>Remove a Book</h2>
      <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>

        <Form.Item
          label="Book ID"
          name="book_id"
          rules={[{ required: true, message: "Please enter Book ID" }]}
        >
          <Input placeholder="1" />
        </Form.Item>

        <Form.Item>
           <Button type="primary" danger htmlType="submit" block>
            Remove Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function UpdateBook() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);

   // ✅ AntD v5 message hook
  const [messageApi, contextHolder] = message.useMessage();

const onFinish = async (values) => {
    try {
      const res = await updateBook(values);
      if (res.data.code === "00") {
        messageApi.open({
          type: "success",
          content: "📖 Book updated successfully!",
          style: {
            marginTop: "15vh", // push it a bit lower from the top
          },
        });
        form.resetFields();
      } else {
        messageApi.open({
          type: "error",
          content: res.data.message || "⚠️ Failed to update book.",
          style: {
            marginTop: "15vh",
          },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: "❌ Error updating book.",
        style: {
          marginTop: "15vh",
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* ✅ Required for the message system to work */}
      {contextHolder}
      <h2>Update a Book</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Book ID"
          name="book_id"
          rules={[{ required: true, message: "Please enter Book ID" }]}
        >
          <Input placeholder="1" />
        </Form.Item>

        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: "Please enter ISBN" }]}
        >
          <Input placeholder="978-3-16-148410-0" />
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
            <Select.Option value="Biography">Biography</Select.Option>
            <Select.Option value="Fantasy">Fantasy</Select.Option>
            <Select.Option value="Artificial Intelligence">Artificial Intelligence</Select.Option>
            <Select.Option value="Software Engineering">Software Engineering</Select.Option>

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
  const [searchResult, setSearchResult] = useState(null);

  const onFinish = async (values) => {
    try {
      const res = await searchBook(values.book_id); // call API here
      if (res.data.code === "00") {
        setSearchResult(res.data.content);
      } else {
        message.info(res.data.message);
        setSearchResult(null);
      }
    } catch (err) {
      console.error(err);
      message.error("Error searching book.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Search a Book</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} // <-- this triggers the async call
        autoComplete="off"
      >
        <Form.Item
          label="Book ID"
          name="book_id"
        >
          <Input placeholder="1" />
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

      {/* Optional: show search result */}
      {searchResult && (
        <div style={{ marginTop: 20 }}>
          <p>Title: {searchResult.title}</p>
          <p>ISBN: {searchResult.isbn}</p>
          <p>Author: {searchResult.author}</p>
          <p>Year Published: {searchResult.year_published}</p>
          <p>Publisher: {searchResult.publisher}</p>
          <p>Genre: {searchResult.genre}</p>
          <p>Total Copies: {searchResult.copies_total}</p>
          <p>Available Copies: {searchResult.copies_available}</p>
        </div>
      )}
    </div>
  );
}


function GetAllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getAllBooks();
        if (res.data.code === "00") {
          setBooks(res.data.content);
        } else {
          message.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        message.error("Error fetching books.");
      }
    };

    fetchBooks();
  }, []);
  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.book_id}>{book.title} by {book.author}</li>
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
            children: <UpdateBook />,
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
