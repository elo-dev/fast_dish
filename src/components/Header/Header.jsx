import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Layout, Typography, Row, Col, Space, Menu, Dropdown } from 'antd'
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import { useAuth } from '../../hooks/useAuth'

import SearchInput from '../SearchInput/SearchInput'

import style from './Header.module.scss'

const { Header } = Layout
const { Title, Text } = Typography

const MainHeader = () => {
  const [isInputView, setIsInputView] = useState(false)

  const { userAuth, signout } = useAuth()

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/recipes-menus">Recipes & Menu</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">My Saved Recipes</a>
      </Menu.Item>
      <Menu.Divider />
      {userAuth && (
        <Menu.Item key="2">
          <Link to="/account">{userAuth.displayName}</Link>
        </Menu.Item>
      )}
      <Menu.Item key="3">
        {userAuth ? (
          <p className={style.menu__signout} onClick={signout}>
            Logout
          </p>
        ) : (
          <Link to="/signup">Sign Up</Link>
        )}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Header className={style.header}>
        <Row className={style.header__row} gutter={16}>
          <Col span={6}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <MenuOutlined className={style.header__menu_icon} />
              </a>
            </Dropdown>
          </Col>
          <Col span={12} className={style.header__title}>
            <Link to="/">
              <Title className={style.title} level={1}>
                Fast Dish
              </Title>
            </Link>
          </Col>
          <Col span={6}>
            <Space>
              <Text className={style.header__text}>Follow</Text>
              <FacebookOutlined className={style.header__icon} />
              <TwitterOutlined className={style.header__icon} />
              <InstagramOutlined className={style.header__icon} />
              <div
                className={style.header__search}
                onClick={() => setIsInputView(true)}
              >
                <Text className={style.header__text}>Search</Text>
                <SearchOutlined className={style.icon__search} />
              </div>
            </Space>
          </Col>
        </Row>
      </Header>
      {isInputView && <SearchInput setIsInputView={setIsInputView} />}
    </>
  )
}

export default MainHeader
