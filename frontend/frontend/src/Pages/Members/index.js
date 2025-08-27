import { Input,InputNumber, Form, Tabs ,Carousel, Typography, Button, Card, Col, Row, Statistic } from "antd";
import React, { useState, Select, useEffect } from "react";
import "antd/dist/reset.css";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

// Shared slide styling
const slideStyle = {
  height: "250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #8990b3ff, #3f4c97)",
  borderRadius: "20px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  padding: "40px",
  color: "#fff",
};

function ActiveUser() {
  return (
    <div style={slideStyle}>
      <Row gutter={32} justify="center" align="middle" style={{ width: "100%" }}>
        <Col span={8}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#fff", marginBottom: 20 }}>
            Account Overview
          </Title>
          <Statistic
            title="Balance (CNY)"
            value={112893}
            precision={2}
            valueStyle={{ fontWeight: "bold" }}
          />
          <Button style={{ marginTop: 16 }} type="primary" size="large">
            Recharge
          </Button>
        </Col>
        <Col span={8}>
          <Statistic title="New Users (Today)" value={342} loading />
        </Col>
      </Row>
    </div>
  );
}

function StatisticsView() {
  return (
    <div style={slideStyle}>
      <Row gutter={32} justify="center" align="middle" style={{ width: "100%" }}>
        <Col span={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Statistic
              title="Active Rate"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Statistic
              title="Idle Rate"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function FeedbackView() {
  return (
    <div style={slideStyle}>
      <Row gutter={32} justify="center" align="middle" style={{ width: "100%" }}>
        <Col span={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Statistic
              title="Feedback"
              value={1128}
              prefix={<LikeOutlined />}
              valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function AddMember() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Member data:", values);
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please enter member ID" }]}
        >
          <Input placeholder="12345" />
        </Form.Item>

        <Form.Item
          label="Registration date"
          name="registration_date"
          rules={[{ required: true, message: "Please enter registration date" }]}
        >
          <Input placeholder="2023-01-01" />
        </Form.Item>

        <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Add Member
                  </Button>
          </Form.Item>

      </Form>
    </div>
  );
}


function RemoveMember() {

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Remove a Member</h2>
      <Form layout="vertical" autoComplete="off">
        <Form.Item
          label="Member ID"
          name="member_id"
          rules={[{ required: true, message: "Please enter Member ID" }]}
        >
          <Input placeholder="12345" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Remove Member
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function UpdateMember() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Member data:", values);
    // Here you’d send values to your backend API
    // fetch("/api/books", { method: "POST", body: JSON.stringify(values) })
  };
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Update a Member</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please enter member ID" }]}
        >
          <Input placeholder="12345" />
        </Form.Item>

        <Form.Item
          label="Registration date"
          name="registration_date"
          rules={[{ required: true, message: "Please enter registration date" }]}
        >
          <Input placeholder="2023-01-01" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Member
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function SearchMember() {
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
          label="ID"
          name="id"
        >
          <Input placeholder="12345" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Registration date"
          name="registration_date"
        >
          <Input placeholder="2023-01-01" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Search Member
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function GetAllMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/members");
      const data = await response.json();
      setMembers(data);
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h2>All Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name} - {member.registration_date}</li>
        ))}
      </ul>
    </div>
  );
}

const App = () => (
  <>
    <div style={{ width: "1200px", margin: "40px auto" }}>
      <Carousel
        autoplay
        dots={{ className: "custom-dots" }}
        autoplaySpeed={4000}
        effect="fade"
      >
        <div>
          <ActiveUser />
        </div>
        <div>
          <StatisticsView />
        </div>
        <div>
          <FeedbackView />
        </div>
      </Carousel>
    </div>

    <Tabs
      defaultActiveKey="1"
      centered
      items={Array.from({ length: 5 }).map((_, i) => {
        const id = String(i + 1);
        if (id === "1") {
          return {
            label: `Add a new Member`,
            key: id,
            children: <AddMember />,
          };
        } else if (id === "2") {
          return {
            label: `Remove a Member`,
            key: id,
            children: <RemoveMember />
          };
        } else if (id === "3") {
          return {
            label: `Update Member Info`,
            key: id,
            children: <UpdateMember />,
          };
        } else if (id === "4") {
          return {
            label: `Search a Member`,
            key: id,
            children: <SearchMember />,
          };
        } else if (id === "5") {
          return {
            label: `Get All Members`,
            key: id,
            children: <GetAllMembers />,
          };
        }
        return null;
      })}
    />
  </>
);

export default App;
