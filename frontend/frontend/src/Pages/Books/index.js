import { Typography, Space, Table, Rate } from 'antd';
import React, { useEffect, useState } from 'react'
import { getBooks } from '../../API';

function Books() {
  const [loading, setloading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => { 
    setloading(true)
    getBooks().then(res =>{ 
      setDataSource(res.products);
      setloading(false)
    })

   }, [])
  return (
    <Space size={20 } direction='vertical'>
      <Typography.Title level={3}>Books</Typography.Title>
      <Table
        loading={loading}
        columns={
          [
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Book ID",
              dataIndex: "id",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>
            },
            {
              title: "Rating",
              dataIndex: "rating",
              render: (value) => { 
                return <Rate value={value} allowHalf />
              }
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Category",
              dataIndex: "category",
            }
          ]
        }
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          // showSizeChanger: true,
          
        }}
      ></Table>
    </Space>
  )
}

export default Books;
