import { Link } from 'react-router-dom'

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import style from './Registration.module.scss'

const { Title } = Typography

const Registration = () => {
  const [form] = Form.useForm()
  const isSmallMediaMatch = useMediaMatch('(max-width: 992px)')

  const { signup, isLoading, googleSignIn, error } = useAuth()

  const onFinish = async ({ name, username, email, password }) => {
    await signup(name, username, email, password)
    form.resetFields()
  }

  const handleGoogleSignIn = async () => {
    await googleSignIn()
    form.resetFields()
  }

  return (
    <Layout className={style.registration}>
      <Row justify="end">
        {!isSmallMediaMatch && (
          <Col lg={9} xxl={5} className={style.registration__sidebar}>
            <div className={style.sidebar__content}>
              <header className={style.sidebar__header}>
                <Link to="/">
                  <Title level={2} className={style.title}>
                    Fast Dish
                  </Title>
                </Link>
                <p className={style.text}>
                  Discover new recipes <br /> Create a unique meal plan.
                </p>
              </header>
              <div className={style.sidebar__art}>
                <div className={style.art__image} />
              </div>
            </div>
          </Col>
        )}
        <Col xs={24} lg={15} xxl={19}>
          <div className={style.form__wrapper}>
            <div className={style.registration__form}>
              {isSmallMediaMatch && (
                <Link to="/">
                  <Title level={2} className={style.title}>
                    Fast Dish
                  </Title>
                </Link>
              )}
              <Title level={1} className={style.subTitle}>
                Sign up to Fast Dish
              </Title>
              <div
                className={style.form__signInGoogle}
                onClick={handleGoogleSignIn}
              >
                <GoogleOutlined />
                <p className={style.form__text}>Continue with Google</p>
              </div>
              <Divider plain>Or</Divider>
              <Form layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Name!',
                        },
                      ]}
                      label={<span className={style.label}>Name</span>}
                    >
                      <Input bordered={false} className={style.input} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Username!',
                        },
                      ]}
                      label={<span className={style.label}>Username</span>}
                    >
                      <Input bordered={false} className={style.input} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                  ]}
                  label={<span className={style.label}>Email</span>}
                >
                  <Input bordered={false} className={style.input} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                  label={<span className={style.label}>Password</span>}
                >
                  <Input.Password
                    className={style.input}
                    bordered={false}
                    placeholder="6+ characters"
                    minLength={6}
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox className={style.agreements}>
                    Creating an account means you`re okay with our Terms of
                    Service, Privacy Policy, and our default Notification
                    Settings.
                  </Checkbox>
                </Form.Item>
                <Row justify="space-between" align="middle">
                  <Col xs={24} lg={12}>
                    <Form.Item>
                      <Button
                        className={style.submit_btn}
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        Create Account
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item>
                      <span className={style.signIn_btn} size="large">
                        Already a member? <Link to="/signin">Sign In</Link>
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      {error && (
        <div className={style.error}>
          <h2 className={style.error__msg}>Mail is already in use</h2>
        </div>
      )}
    </Layout>
  )
}

export default Registration
