import {
  MailOutlined,
  LockOutlined
} from '@ant-design/icons';
import {
  Layout,
  Space,
  Carousel,
  Button,
  Divider,
  Form,
  Input,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom';

import '../styles/login.scss';
import { setLogin, setUserInfo } from '../features/user/userSlice';
import { getUsers } from '../user';

const { Content } = Layout;

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const { email, password } = values;
    const users = await getUsers();
    const matchUser = users.find(u => u.email === email && u.password === password);
    if (matchUser) {
      dispatch(setUserInfo(matchUser));
      dispatch(setLogin(true));
    } else {
      messageApi.open({
        type: 'error',
        content: 'User not found. Please go to sign up.',
      });
    }
  };

  const validateMessages = {
    required: 'Please input your ${name}.',
    types: {
      email: '${name} is not a valid email.',
    },
  };

  // If login successfully navigate to root
  if (user.isLogin) {
    return <Navigate to="/" />;
  }

  // if (user.info && Object.keys(user.info).length > 0) {
  //   dispatch(setUserInfo({}));
  // }

  return (
    <Layout className="login">
      {contextHolder}
      <Content className="login-container">
        <div className="login-container__left">
          <Carousel className="login-banner">
            <div className="login-banner__item banner-1">
              <div className="login-banner__container" style={{ height: '100%' }}></div>
            </div>
            <div className="login-banner__item banner-2">
              <div className="login-banner__container" style={{ height: '100%' }}></div>
            </div>
            <div className="login-banner__item banner-3">
              <div className="login-banner__container" style={{ height: '100%' }}></div>
            </div>
          </Carousel>
        </div>
        <div className="login-container__right">
          <div className="login-card">
            <Form
              name="basic"
              className="login-form"
              labelCol={{
                span: 8,
              }}
              initialValues={{}}
              onFinish={onFinish}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <Form.Item noStyle>
                <h2 className="login-form__headline">Sign In</h2>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true }]}
                validateTrigger={['onBlur']}
              >
                <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit" className="login-form__button">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <Divider plain>Or sign in with</Divider>
            <Space className="login__auth-connections" size="middle">
              <Button icon={<i className="icon-google"></i>}>Google</Button>
              <Button icon={<i className="icon-facebook"></i>}>Facebook</Button>
            </Space>
            <div className="login__helper-actions">
              Create an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}