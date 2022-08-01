import { Link } from 'react-router-dom'

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import style from './Authorization.module.scss'

const { Title } = Typography

const Authorization = () => {
  const { signin, isLoading, error, googleSignIn } = useAuth()

  const isSmallMediaMatch = useMediaMatch('(max-width: 992px)')

  const onFinish = ({ email, password }) => {
    signin(email, password)
  }

  const handleGoogleSignIn = async () => {
    await googleSignIn()
  }

  return (
    <Layout className={style.authorization}>
      <Row justify="end">
        {!isSmallMediaMatch && (
          <Col lg={9} xxl={5} className={style.authorization__sidebar}>
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
            <div className={style.authorization__form}>
              {isSmallMediaMatch && (
                <Link to="/">
                  <Title level={2} className={style.title}>
                    Fast Dish
                  </Title>
                </Link>
              )}
              <Title level={1} className={style.subTitle}>
                Sign in to Fast Dish
              </Title>
              <div
                className={style.form__signInGoogle}
                onClick={handleGoogleSignIn}
              >
                <GoogleOutlined />
                <p className={style.form__text}>Continue with Google</p>
              </div>
              <Divider plain className={style.divider}>
                Or
              </Divider>
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
                    <span className={style.label}>
                      Username or Email Address
                    </span>
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
                <Row justify="space-between" align="middle">
                  <Col xs={24} lg={12}>
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
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item>
                      <span className={style.signUp_btn} size="large">
                        Not a member? <Link to="/signup">Sign up now</Link>
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
