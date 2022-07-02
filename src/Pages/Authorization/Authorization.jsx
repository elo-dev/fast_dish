import { useAuth } from '../../hooks/useAuth'

import {
  Button,
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

import foodIcon from '../../assets/images/Authorization/food_icon.png'

import style from './Authorization.module.scss'

const { Title } = Typography

const Authorization = () => {
  const { signin, isLoading, error, googleSignIn } = useAuth()

  const onFinish = ({ email, password }) => {
    signin(email, password)
  }

  const handleGoogleSignIn = async () => {
    await googleSignIn()
  }

  return (
    <Layout className={style.authorization}>
      <Row justify="end">
        <Col span={9} className={style.authorization__text_block}>
          <p className={style.text}>
            Discover new recipes Create a unique meal plan.
          </p>
          <Image src={foodIcon} preview={false} />
        </Col>
        <Col span={15}>
          <div className={style.authorization__form}>
            <Title level={1}>Sign in to Fast Dish</Title>
            <div
              className={style.form__signInGoogle}
              onClick={handleGoogleSignIn}
            >
              <GoogleOutlined />
              <p className={style.form__text}>Continue with Google</p>
            </div>
            <Divider plain>Or</Divider>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username or Email!',
                  },
                ]}
                label={
                  <span className={style.label}>Username or Email Address</span>
                }
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
                <Input.Password bordered={false} className={style.input} />
              </Form.Item>
              <Form.Item>
                <Button
                  className={style.submit_btn}
                  size="large"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      {error && (
        <div className={style.error}>
          <h2 className={style.error__msg}>
            We couldn`t find an account matching the username and password you
            entered. Please check your username and password and try again.
          </h2>
        </div>
      )}
    </Layout>
  )
}

export default Authorization
