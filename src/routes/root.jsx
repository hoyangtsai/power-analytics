import React, { useCallback, useState, createContext } from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Input, Dropdown, Avatar, Badge, Button, Popover, Empty } from 'antd';
import {
  AppstoreFilled,
  BarChartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  LinkOutlined,
  ShareAltOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  ThunderboltFilled,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { setLogin, setUserInfo } from '../features/user/userSlice';
import ErrorPage from '../error-page';

import Overview from './overview';
import Login from './login';
import SignUp from './signup';
import Allocation, { loader as allocationLoader } from './allocation';
import Conversion from './conversion';

import styles from '../styles/root.module.scss';

const { Header, Sider, Content } = Layout;

export const routers = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        label: '概觀',
        description: '概觀報告',
        element: <Overview />,
        icon: () => <AppstoreFilled />,
      },
      {
        path: 'allocation',
        label: '餘電匹配分析',
        description: 'Monitor progress regularly to increase sales',
        element: <Allocation />,
        loader: allocationLoader,
        icon: () => <BarChartOutlined />,
      },
      {
        path: 'conversion',
        label: '轉供電量',
        description: '發電及用電轉供資訊',
        element: <Conversion />,
        icon: () => <ShoppingCartOutlined />,
      },
      {
        label: '基本資料',
        icon: () => <ShoppingOutlined />,
        disabled: true,
      },
      {
        label: '喜好設定',
        icon: () => <LinkOutlined />,
        disabled: true,
      },
      {
        label: '契約最佳化',
        icon: () => <ShareAltOutlined />,
        disabled: true,
      },
      {
        label: '幫助',
        icon: () => <QuestionCircleOutlined />,
        disabled: true,
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    element: <Login />,
  },
  {
    name: 'signup',
    path: '/signup',
    element: <SignUp />,
  },
];

const userActionItems = [
  {
    key: '1',
    label: '個人中心',
  },
  {
    key: '2',
    label: '登出',
  },
];

const { Search } = Input;

const siderDefaultValue = {
  collapsed: false,
  type: 'responsive',
};

export const SiderContext = createContext(siderDefaultValue);

const menuItems = routers[0].children.map((entry, index) => {
  return {
    key: index,
    icon: React.createElement(entry.icon),
    label: entry.disabled ? (
      entry.label
    ) : (
      <NavLink key={entry.path || 'index'} to={entry.path}>
        {entry.label}
      </NavLink>
    ),
    disabled: entry.disabled,
  };
});

const bottomMenuItems = [
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '設定',
    disabled: true,
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '登出',
  },
];

export default function Root() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [sider, setSider] = useState(siderDefaultValue);
  const location = useLocation();

  const getMenuSelectKey = () => {
    const rootPages = routers[0].children;
    const pageIndex = rootPages.findIndex((p) => location.pathname.includes(p.path));
    return pageIndex === -1 ? ['0'] : [String(pageIndex)];
  };

  const getHeaderTitle = () => {
    const rootPages = routers[0].children;
    const currentPage = rootPages.find((p) => location.pathname.includes(p.path));
    if (currentPage) {
      return (
        <>
          <p className={styles.headerTitle}>{currentPage.label}</p>
          <div className={styles.headerDesc}>{currentPage.description}</div>
        </>
      );
    }
    return (
      <>
        <p className={styles.headerTitle}>{rootPages[0].label}</p>
        <div className={styles.headerDesc}>{rootPages[0].description}</div>
      </>
    );
  };

  const handleActionMenu = useCallback(
    (item) => {
      const { key } = item;
      if (key === 'logout') {
        dispatch(setLogin(false));
        dispatch(setUserInfo({}));
      }
    },
    [dispatch]
  );

  if (!user.isLogin) {
    return <Navigate to="login" />;
  }

  return (
    <SiderContext.Provider value={sider}>
      <Layout id="page-container">
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          className={styles.sider}
          onCollapse={(collapsed, type) => setSider({ collapsed, type })}
        >
          <h3 className={styles.siderHeader}>
            <i className={styles.productLogo}>
              <ThunderboltFilled />
            </i>
            綠電匹配服務
          </h3>
          <Menu
            className={styles.entryMenu}
            style={{ border: 0 }}
            items={menuItems}
            selectedKeys={getMenuSelectKey()}
          />
          <Menu
            className={styles.actionMenu}
            style={{ border: 0, marginTop: 'auto' }}
            items={bottomMenuItems}
            onClick={handleActionMenu}
          />
        </Sider>
        <Layout className={styles.pageLayout}>
          <Header className={styles.pageHeader}>
            <div className="ead-justify-grid">
              <div className="ead-justify-grid__col ead-justify-grid__col--left ead-navbar__headline">
                {getHeaderTitle()}
              </div>
              <div className="ead-justify-grid__col ead-justify-grid__col--right">
                <div className="ead-navbar__operation">
                  <Search className="ead-navbar__operation-item ead-search" placeholder="Search anything" allowClear />
                  <Popover
                    className="ead-navbar__operation-item ead-navbar__popover notifications-list"
                    content={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暫無通知" />}
                    placement="bottom"
                    trigger="click"
                  >
                    <Badge>
                      <Button className="notifications-list__button" type="text" icon={<BellOutlined />} />
                    </Badge>
                  </Popover>
                  <Dropdown
                    className="ead-navbar__operation-item ead-navbar__dropdown user-avatar__menu"
                    menu={{ items: userActionItems }}
                  >
                    <Avatar className="user-avatar" icon={<UserOutlined />} />
                  </Dropdown>
                </div>
              </div>
            </div>
          </Header>
          <Content className={styles.pageContent}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </SiderContext.Provider>
  );
}
