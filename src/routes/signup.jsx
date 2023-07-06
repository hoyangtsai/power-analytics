import {
  UserOutlined,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons';
import {
  Layout,
  Space,
  Carousel,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

import '../styles/login.scss';
import { setLogin, setUserInfo } from '../features/user/userSlice';
import { createUser, getUsers } from '../user';

const { Content } = Layout;

export default function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const { username, email, password, agreement } = values;
    const users = await getUsers();
    const matchUser = users.find(u => u.email === email);
    if (!agreement) {
      messageApi.open({
        type: 'error',
        content: 'Please check the Terms & Conditions and Privacy Policy.',
      });
    } else if (matchUser) {
      messageApi.open({
        type: 'error',
        content: 'This user info already exists.',
      });
    } else if (username && email && password) {
      const user = await createUser({ username, email, password });
      dispatch(setLogin(true));
      dispatch(setUserInfo(user));
    }
  };

  const validateMessages = {
    required: 'Please input your ${name}.',
    types: {
      email: '${name} is not a valid email.',
    },
  };

  const validatePassword = async (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Your password is not strong enough. Use at least 8 characters');
    }
    return Promise.resolve();
  };

  // if user setLogin navigate to home
  if (user.isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
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
                onFinish={onFinish}
                autoComplete="off"
                validateMessages={validateMessages}
              >
                <Form.Item noStyle>
                  <h2 className="login-form__headline">Sign Up for an Account</h2>
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[{ required: true }]}
                  validateTrigger={['onBlur']}
                >
                  <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, type: 'email' }]}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      validator: validatePassword,
                    },
                  ]}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item name="agreement" valuePropName="checked" noStyle>
                  <Checkbox className="login-form__agreement">
                    By creating an account means you agree to the
                    <a className="login-form__agreement-link" href="">
                      Terms & Conditions
                    </a>
                    and our
                    <a className="login-form__agreement-link" href="">
                      Privacy Policy
                    </a>
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button size="large" type="primary" htmlType="submit" className="login-form__button">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
              <Divider plain>Or sign up with</Divider>
              <Space className="login__auth-connections" size="middle">
                <Button icon={<i className="icon-google"></i>}>Google</Button>
                <Button icon={<i className="icon-facebook"></i>}>Facebook</Button>
              </Space>
              <div className="login__helper-actions">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>

  );
}