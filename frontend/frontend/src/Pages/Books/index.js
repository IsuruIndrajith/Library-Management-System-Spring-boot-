import { Typography, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getBooks } from '../../API';

function Books() {
  const [loading, setloading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => { 
    setloading(true)
    getBooks().then(res => { 
    setDataSource(res.content);  // backend sends array inside 'content'
    setloading(false);
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
              dataIndex: "bookId",
            },
            {
              title: "isbn",
              dataIndex: "isbn",
              // render: (value) => <span>${value}</span>
            },
            {
              title: "Author",
              dataIndex: "author",
              // render: (value) => { 
                // return <Rate value={value} allowHalf />
              // }
            },
            {
              title: "Publisher",
              dataIndex: "publisher",
            },
            {
              title: "Published Year",
              dataIndex: "yearPublished",
            },
            {
              title: "Genre",
              dataIndex: "genre",
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
