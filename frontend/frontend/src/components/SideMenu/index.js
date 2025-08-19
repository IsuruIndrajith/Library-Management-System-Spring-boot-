import { Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  BarChartOutlined,
  TransactionOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


function SideMenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu
        onClick={(item) => {
          // item.key
          navigate(item.key)
        }}
        items={[
          { label: "Dashboard", key:'/', icon: <DashboardOutlined /> },
          { label: "Books", key: '/books', icon: <BookOutlined /> },
          { label: "Reports & Analysis", key: '/reports', icon: <BarChartOutlined /> },
          { label: "Lending & Transactions", key: '/lending', icon: <TransactionOutlined /> },
          { label: "Member Management", key: '/members', icon: <TeamOutlined /> }
        ]}
      />
    </div>
  )
}

export default SideMenu;
