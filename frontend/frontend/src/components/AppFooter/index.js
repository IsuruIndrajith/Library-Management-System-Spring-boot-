import { Typography } from 'antd'
import React from 'react'

function AppFooter() {
  return <div className='AppFooter'>
      <Typography.Link> ShelfMaster ©2025</Typography.Link>
    <Typography.Link href="https://www.google.com" target={ '_blank'}>Privacy Policy</Typography.Link>
    <Typography.Link href="https://www.google.com" target={ '_blank'}>Terms of Service</Typography.Link>
  </div>
  
}

export default AppFooter;


