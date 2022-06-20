import { NavLink, Outlet } from 'react-router-dom'
import { Col, Divider, Image, Layout, Row, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useAuth } from '../../hooks/useAuth'

import cn from 'classnames'

import style from './Account.module.scss'

const { Title, Text } = Typography

const Account = () => {
  const { userAuth } = useAuth()

  const activeNav = ({ isActive }) =>
    cn(style.content__tab, {
      [style.content__tab_active]: isActive,
    })

  return (
    <Layout className={style.account}>
      <Row justify="space-between" gutter={24}>
        <Col span={8}>
          <div className={cn(style.info, style.account__container)}>
            <Space direction="vertical">
              {userAuth?.photoURL ? (
                <Image
                  src={userAuth.photoURL}
                  preview={false}
                  className={style.info__img}
                />
              ) : (
                <UserOutlined className={style.info__without_img} />
              )}
              <Title className={style.info__name}>
                {userAuth?.displayName}
              </Title>
              <Text className={style.info__description}>Description</Text>
              <button className={style.info__btn_settings}>Settings</button>
            </Space>
          </div>
        </Col>

        <Col span={16}>
          <div className={cn(style.content, style.account__container)}>
            <div className={style.content__header}>
              <Space split={<Divider type="vertical" />}>
                <NavLink className={activeNav} to="meal-week">
                  Meal Plan Week
                </NavLink>
                <NavLink className={activeNav} to="meal-day">
                  Meal Plan Day
                </NavLink>
                <NavLink className={activeNav} to={'/shopping-list'}>
                  Shopping list
                </NavLink>
                <NavLink className={activeNav} to={'/favourites'}>
                  Favourites
                </NavLink>
              </Space>
            </div>

            <div className={style.content__main}>
              <Outlet />
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

export default Account
