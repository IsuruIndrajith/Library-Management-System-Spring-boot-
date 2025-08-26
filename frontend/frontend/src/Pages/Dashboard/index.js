import React, { useEffect, useState } from 'react';
import { Card, Typography, Statistic, Space, Table } from 'antd';
import { BookOutlined, InboxOutlined, ExportOutlined, TeamOutlined} from '@ant-design/icons'; 
import { getNewlyAddedBooks, getRecentlyAddedBooks } from '../../API';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




function Dashboard() {
  return (
    <div>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Space size={20} direction="horizontal">
        <DashboardCard icon={<BookOutlined style={{color: "green", backgroundColor: "rgba(0,255,0,0.5)", borderRadius:20, fontSize:24, padding: 8}} />} title="Total Copies" value={1234} />
        <DashboardCard icon={<InboxOutlined style={{color: "blue", backgroundColor: "rgba(0,0,255,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Available Copies" value={1234} />
        <DashboardCard icon={<ExportOutlined style={{color: "orange", backgroundColor: "rgba(255,165,0,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Lent Copies" value={1234} />
        <DashboardCard icon={<TeamOutlined style={{color: "purple", backgroundColor: "rgba(128,0,128,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} title="Members" value={1234} />

      </Space>

     <Space direction="vertical" size={20} style={{ width: "100%" }}>
       <RecentBooks />
       <DashboardChart />
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

function RecentBooks() { 
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getRecentlyAddedBooks().then(res => {
      setDataSource(res.products.slice(0, 5));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recently Added Books</Typography.Text>
      
      <Table
        rowKey="id"
       columns={[
      {
        title: "title",
        dataIndex: "title",
      },
      {
        title: "Rating",
        dataIndex: 'rating',
      
      },
      {
        title: "Brand",
        dataIndex: 'brand',
      
      },
    ]}
    dataSource={dataSource}
    loading={loading}
    pagination={false}
  />

    

    </>

  )
}

function DashboardChart() {
  const [RevenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => { 
    getNewlyAddedBooks().then(res => {
      const labels = res.carts.map(cart => {
        return `User-${cart.userId}`
      });

      const data = res.carts.map(cart => {
        return cart.discountedTotal;
      });

      const dataSource = {
  labels,
  datasets: [
    {
      label: 'Newly Added Books',
      data: data,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
   
  ],
      };
      setRevenueData(dataSource);

    })
  }, []);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    },
    title: {
      display: true,
      text: 'Newly added Books',
    },
  },
};
  
  


   return <Bar options={options} data={RevenueData} />;
}

export default Dashboard;