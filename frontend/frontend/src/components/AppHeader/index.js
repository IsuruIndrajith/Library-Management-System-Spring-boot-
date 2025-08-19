import { Image, Typography, Space } from "antd";
import { BellFilled } from '@ant-design/icons';
function AppHeader() {
  
    return <div className="AppHeader">
      <Image
        src=""
        width={40}
      />
      <Typography.Title>ShelfMaster</Typography.Title>
      <Space>
        <BellFilled style={{ fontSize: 24 }}/>
      </Space>
    </div>;
}

export default AppHeader;
