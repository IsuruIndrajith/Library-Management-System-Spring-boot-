import React, { useEffect, useState } from 'react';
import { Card, Typography, Statistic, Space, Table } from 'antd';
import { BookOutlined, InboxOutlined, ExportOutlined, TeamOutlined} from '@ant-design/icons'; 
import { getBooks } from '../../API';

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
  const [stats, setStats] = useState({
    totalCopies: 0,
    availableCopies: 0,
    lentCopies: 0,
    members: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksResponse = await getBooks();
        const books = booksResponse.content || [];
        
        const totalCopies = books.reduce((sum, book) => sum + (book.copies_total || 0), 0);
        const availableCopies = books.reduce((sum, book) => sum + (book.copies_available || 0), 0);
        const lentCopies = totalCopies - availableCopies;
        
        setStats({
          totalCopies,
          availableCopies,
          lentCopies,
          members: 0 // We don't have members API integrated yet
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Space size={20} direction="horizontal">
        <DashboardCard 
          icon={<BookOutlined style={{color: "green", backgroundColor: "rgba(0,255,0,0.5)", borderRadius:20, fontSize:24, padding: 8}} />} 
          title="Total Copies" 
          value={loading ? 0 : stats.totalCopies} 
          loading={loading}
        />
        <DashboardCard 
          icon={<InboxOutlined style={{color: "blue", backgroundColor: "rgba(0,0,255,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} 
          title="Available Copies" 
          value={loading ? 0 : stats.availableCopies} 
          loading={loading}
        />
        <DashboardCard 
          icon={<ExportOutlined style={{color: "orange", backgroundColor: "rgba(255,165,0,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} 
          title="Lent Copies" 
          value={loading ? 0 : stats.lentCopies} 
          loading={loading}
        />
        <DashboardCard 
          icon={<TeamOutlined style={{color: "purple", backgroundColor: "rgba(128,0,128,0.5)", borderRadius:20,  fontSize:24, padding:8}} />} 
          title="Members" 
          value={loading ? 0 : stats.members} 
          loading={loading}
        />

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
    <Card align="middle">
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
    getBooks().then(res => {
      const books = res.content || [];
      setDataSource(books.slice(-3)); // last 3
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recently Added Books</Typography.Text>
      
      <Table
        rowKey="book_id"
       columns={[
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "ISBN",
        dataIndex: 'isbn',
      
      },
      {
        title: "Author",
        dataIndex: 'author',
      },
      
      {
        title: "Genre",
        dataIndex: 'genre',
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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => { 
    getBooks().then(res => {
      const books = res.content || [];
      
      // count books per genre
      const genreCounts = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(genreCounts);
      const data = Object.values(genreCounts);

      setChartData({
        labels,
        datasets: [
          {
            label: "Books per Genre",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Books by Genre" },
    },
  };

  return (
    <Card style={{ width: 500, height: 350 }}>
      <Bar options={options} data={chartData} />
    </Card>
  );
}

export default Dashboard;