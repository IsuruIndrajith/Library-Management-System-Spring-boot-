import { Image, Typography, Space, Button, Dropdown } from "antd";
import { BellFilled, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload(); // Refresh to update the app state
  };
  
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: `${user?.username || 'Admin'} (Administrator)`,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];
  
  return <div className="AppHeader">
    <Image
      src=""
      width={40}
    />
    <Typography.Title>ShelfMaster</Typography.Title>
    <Space>
      <BellFilled style={{ fontSize: 24 }}/>
      <Dropdown
        menu={{ items: userMenuItems }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button type="text" icon={<UserOutlined />}>
          {user?.username || 'User'}
        </Button>
      </Dropdown>
    </Space>
  </div>;
}

export default AppHeader;
