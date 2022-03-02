import React from 'react'
import { Layout, Typography, Row, Col, Space, Menu, Dropdown } from 'antd'
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import style from './Header.module.scss'

const { Header } = Layout
const { Title, Text } = Typography

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

const MainHeader = () => {
  return (
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
          <Title className={style.title} level={1}>
            Fast Dish
          </Title>
        </Col>
        <Col span={6}>
          <Space>
            <Text className={style.header__text}>Follow</Text>
            <FacebookOutlined className={style.header__icon} />
            <TwitterOutlined className={style.header__icon} />
            <InstagramOutlined className={style.header__icon} />
            <div className={style.header__search}>
              <Text className={style.header__text}>Search</Text>
              <SearchOutlined className={style.icon__search} />
            </div>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default MainHeader
