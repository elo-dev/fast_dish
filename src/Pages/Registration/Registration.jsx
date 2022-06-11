import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

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

import MainHeader from '../../components/Header/Header'

import foodIcon from '../../assets/images/Registration/food_icon.png'

import style from './Registration.module.scss'

const { Title } = Typography

const Registration = () => {
  const [form] = Form.useForm()

  const { signup, isLoading } = useAuth()

  const onFinish = ({ name, username, email, password }) => {
    signup(name, username, email, password)
    form.resetFields()
  }

  return (
    <>
      <MainHeader />
      <Layout className={style.registration}>
        <Row justify="end">
          <Col span={9} className={style.registration__text_block}>
            <p className={style.text}>
              Discover new recipes Create a unique meal plan.
            </p>
            <Image src={foodIcon} preview={false} />
          </Col>
          <Col span={15}>
            <div className={style.registration__form}>
              <Title level={1}>Sign up to Fast Dish</Title>
              <div className={style.form__signInGoogle}>
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
                  <Checkbox>
                    Creating an account means you`re okay with our Terms of
                    Service, Privacy Policy, and our default Notification
                    Settings.
                  </Checkbox>
                </Form.Item>
                <Row justify="space-between" align="middle">
                  <Col>
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
                  <Col>
                    <Form.Item>
                      <span className={style.signIn_btn} size="large">
                        Already a member? <Link to="/signin">Sign In</Link>
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default Registration