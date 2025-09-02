import { Table, Flex, Progress, Typography, Row, Col, Card,
  Statistic, Badge, Space, DatePicker, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { 
  UserOutlined, BookOutlined, 
  SwapOutlined, ClockCircleOutlined 
} from '@ant-design/icons';
import { getAllMembers, getBooks } from '../../API';

function Reports() {
  const [loading, setLoading] = useState(true);
  const [bookStats, setBookStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0
  });
  const [memberStats, setMemberStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksData, membersData] = await Promise.all([
          getBooks(),
          getAllMembers()
        ]);
        
        // Process books data
        setBookStats({
          totalBooks: booksData.length || 0,
          borrowedBooks: booksData.filter(book => book.borrowed).length || 0,
          overdueBooks: booksData.filter(book => book.overdue).length || 0
        });

        // Process members data
        setMemberStats({
          totalMembers: membersData.length || 0,
          activeMembers: membersData.filter(member => member.active).length || 0,
          inactiveMembers: membersData.filter(member => !member.active).length || 0
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update the statistics cards to use actual data
  // Sample data for Area chart
  const borrowingTrendData = [
    { date: '2025-01', books: 35 },
    { date: '2025-02', books: 42 },
    { date: '2025-03', books: 58 },
    // Add more data points...
  ];

  const areaConfig = {
    data: borrowingTrendData,
    xField: 'date',
    yField: 'books',
    smooth: true,
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    }
  };

  const genreColumns = [
    {
      title: 'Genre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Books',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Borrowed',
      dataIndex: 'borrowed',
      key: 'borrowed',
    }
  ];

  const genreData = [
    { name: 'Fiction', total: 150, available: 100, borrowed: 50 },
    { name: 'Non-Fiction', total: 120, available: 85, borrowed: 35 },
    // Add more genres...
  ];

  return (
    <div className="reports-container" style={{ padding: '24px' }}>
      <Typography.Title level={3}>Library Statistics Dashboard</Typography.Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Summary Statistics */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Total Books"
                  value={bookStats.totalBooks}
                  prefix={<BookOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Active Members"
                  value={memberStats.activeMembers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Books Borrowed"
                  value={bookStats.borrowedBooks}
                  prefix={<SwapOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Overdue Books"
                  value={bookStats.overdueBooks}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Genre-wise Book Distribution */}
            <Col span={14}>
              <Card title="Book Distribution by Genre">
                <Table 
                  columns={genreColumns} 
                  dataSource={genreData}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>

            {/* Member Status */}
            <Col span={10}>
              <Card title="Member Status Distribution">
                <Flex gap="small" vertical>
                  <Space direction="vertical">
                    <Badge status="success" text="Active Members" /> 
                    <Progress percent={75} />
                    <Badge status="warning" text="Inactive Members" />
                    <Progress percent={15} />
                    <Badge status="error" text="Expired Memberships" />
                    <Progress percent={10} />
                  </Space>
                </Flex>
              </Card>
            </Col>
          </Row>

          {/* Borrowing Trends */}
          <Card title="Monthly Borrowing Trends" style={{ marginTop: '24px' }}>
            <Area {...areaConfig} />
          </Card>

          {/* Recent Activities */}
          <Card title="Recent Activities" style={{ marginTop: '24px' }}>
            <Table 
              columns={[
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Activity',
                  dataIndex: 'activity',
                  key: 'activity',
                },
                {
                  title: 'Member',
                  dataIndex: 'member',
                  key: 'member',
                },
                {
                  title: 'Book',
                  dataIndex: 'book',
                  key: 'book',
                }
              ]}
              dataSource={[
                {
                  key: '1',
                  date: '2025-09-02',
                  activity: 'Book Borrowed',
                  member: 'John Doe',
                  book: 'The Great Gatsby'
                },
                // Add more activities...
              ]}
            />
          </Card>
        </>
      )}
    </div>
  );
}

export default Reports;