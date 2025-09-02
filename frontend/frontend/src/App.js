import './App.css';
import 'antd/dist/reset.css';
import { } from 'antd';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import PageContent from './components/PageContent';
import SideMenu from './components/SideMenu';
import { Space } from 'antd';
import { useLocation } from 'react-router-dom';
import AuthService from './services/AuthService';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const user = AuthService.getCurrentUser();
  
  // If on auth pages or user not authenticated or not admin, show simple layout
  if (isAuthPage || !user || user.role !== 'ADMIN') {
    return (
      <div className="App">
        <PageContent />
      </div>
    );
  }
  
  // Show full layout for authenticated users
  return (
    <div className="App">
      <AppHeader />
      <Space className='SideMenuAndPageContent'>
        <SideMenu />
        <PageContent />
      </Space>
      <AppFooter/>
    </div>
  );
}

export default App;
