import { Carousel, Typography, Button, Card, Col, Row, Statistic } from "antd";
import React from "react";
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

const App = () => (
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
);

export default App;
