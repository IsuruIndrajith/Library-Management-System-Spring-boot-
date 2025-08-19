import './App.css';
import 'antd/dist/reset.css';
import { } from 'antd';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import PageContent from './components/PageContent';
import SideMenu from './components/SideMenu';
import { Space } from 'antd';

function App() {
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
