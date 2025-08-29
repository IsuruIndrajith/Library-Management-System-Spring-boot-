import { Input,InputNumber ,message, Form, Tabs ,Carousel, Typography, Button, Card, Col, Row, Statistic, List } from "antd";
import React, { useState, Select, useEffect } from "react";
import "antd/dist/reset.css";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { addMember, deleteMember, updateMember, getMemberById, getAllMembers } from "../../API";


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
  const [members, setMembers] = useState([]);

  // ✅ AntD message hook
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const memberData = {
        id: values.id,
        name: values.name,
        registrationDate: values.registrationDate,
        contactNo: values.contactNo,
      };

      const res = await addMember(memberData);

      if (res.status === 200 || res.status === 201) {
        messageApi.open({
          type: "success",
          content: "✅ Member added successfully!",
          style: { marginTop: "15vh" },
        });

        form.resetFields();
        setMembers((prev) => [...prev, res.data]); // add new member to state
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to add member",
          style: { marginTop: "15vh" },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: "❌ Error adding member",
        style: { marginTop: "15vh" },
      });
    }
  };


  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* ✅ must render this once */}
      {contextHolder}
      <h2>Add a Member</h2>
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
          label="Registration date"
          name="registrationDate"
          rules={[{ required: true, message: "Please enter registration date" }]}
        >
          <Input placeholder="2023-01-01" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNo"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="123-456-7890" />
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
  const [form] = Form.useForm();

  // ✅ AntD message hook
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const memberId = values.id;

      const res = await deleteMember(memberId);

      if (res.status === 200 || res.status === 204) {
        messageApi.open({
          type: "success",
          content: `✅ Member with ID ${memberId} removed successfully!`,
          style: { marginTop: "15vh" },
        });

        form.resetFields();
      } else {
        messageApi.open({
          type: "error",
          content: `Failed to remove member with ID ${memberId}`,
          style: { marginTop: "15vh" },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: `❌ Error removing member with ID ${values.member_id}`,
        style: { marginTop: "15vh" },
      });
    }
  };

  return (
     <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* ✅ must render this once */}
      {contextHolder}
      <h2>Remove a Member</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Member ID"
          name="id"
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

  // ✅ AntD message hook
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const memberId = values.id;
      const memberData = {
        name: values.name,
        registrationDate: values.registration_date,
        contactNo: values.contact_number,
      };

      const res = await updateMember(memberId, memberData);

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: `✅ Member with ID ${memberId} updated successfully!`,
          style: { marginTop: "15vh" },
        });

        form.resetFields();
      } else {
        messageApi.open({
          type: "error",
          content: `Failed to update member with ID ${memberId}`,
          style: { marginTop: "15vh" },
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: "error",
        content: `❌ Error updating member with ID ${values.id}`,
        style: { marginTop: "15vh" },
      });
    }
  };

  return (
     <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {contextHolder}
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

        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="123-456-7890" />
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
  const [member, setMember] = useState(null);

   // ✅ AntD message hook
  const [messageApi, contextHolder] = message.useMessage();

   const onFinish = async (values) => {
    try {
      if (!values.id) {
        messageApi.open({
          type: "warning",
          content: "⚠️ Please enter a Member ID",
          style: { marginTop: "15vh" },
        });
        return;
      }

      const res = await getMemberById(values.id);

      if (res.status === 200) {
        setMember(res.data);
        messageApi.open({
          type: "success",
          content: `✅ Member with ID ${values.id} found!`,
          style: { marginTop: "15vh" },
        });
      } else {
        setMember(null);
        messageApi.open({
          type: "error",
          content: `❌ Member with ID ${values.id} not found`,
          style: { marginTop: "15vh" },
        });
      }
    } catch (err) {
      console.error(err);
      setMember(null);
      messageApi.open({
        type: "error",
        content: `❌ Error searching member with ID ${values.id}`,
        style: { marginTop: "15vh" },
      });
    }
  };


  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {contextHolder}
      <h2>Search a Member</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please enter Member ID" }]}
        >
          <Input placeholder="12345" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Search Member
          </Button>
        </Form.Item>
      </Form>
      {/* Display search result */}
      {member && (
        <Card
          title={`Member ID: ${member.id}`}
          style={{ marginTop: 20 }}
        >
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Registration Date:</strong> {member.registrationDate}</p>
          <p><strong>Contact No:</strong> {member.contactNo}</p>
        </Card>
      )}


    </div>
  );
}

function GetAllMembers() {
  const [members, setMembers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getAllMembers(); // Axios GET request
        if (res.status === 200) {
          setMembers(res.data);
        } else {
          messageApi.open({
            type: "error",
            content: "❌ Failed to fetch members",
            style: { marginTop: "15vh" },
          });
        }
      } catch (err) {
        console.error(err);
        messageApi.open({
          type: "error",
          content: "❌ Error fetching members",
          style: { marginTop: "15vh" },
        });
      }
    };

    fetchMembers();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {contextHolder}
      <h2>All Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={members}
          renderItem={(member) => (
            <List.Item>
              <Card title={`ID: ${member.id}`}>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Registration Date:</strong> {member.registrationDate}</p>
                <p><strong>Contact No:</strong> {member.contactNo}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
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
