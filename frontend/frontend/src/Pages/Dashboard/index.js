import React from 'react';
import { Card, Typography, Statistic, Space } from 'antd';
import { BookOutlined, InboxOutlined, ExportOutlined, TeamOutlined} from '@ant-design/icons'; 

function Dashboard() {
  return (
    <div>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard icon={<BookOutlined style={{color: "green", backgroundColor: "rgba(0,255,0,0.5)", borderRadius:20, fontSize:24, padding: 8}} />} title="Total Copies" value={1234} />
        <DashboardCard icon={<InboxOutlined style={{color: "blue", backgroundColor: "rgba(0,0,255,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Available Copies" value={1234} />
        <DashboardCard icon={<ExportOutlined style={{color: "orange", backgroundColor: "rgba(255,165,0,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Lent Copies" value={1234} />
        <DashboardCard icon={<TeamOutlined style={{color: "purple", backgroundColor: "rgba(128,0,128,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Members" value={1234} />

      </Space>
    
    </div>
  )
}

function DashboardCard({ title, value, icon }) { 
  return (
    <Card>
      <Space direction="vertical" align='center'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;
