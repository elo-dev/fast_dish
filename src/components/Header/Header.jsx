import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Layout,
  Dropdown,
  Typography,
  Row,
  Col,
  Space,
  Menu,
  Badge,
  Avatar,
} from 'antd'
import {
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  StarOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import { useGetShoppingListQuery } from '../../redux/services/shoppingList'

import { useAuth } from '../../hooks/useAuth'

import SearchInput from '../SearchInput/SearchInput'

import style from './Header.module.scss'

const { Header } = Layout
const { Title } = Typography

const MainHeader = () => {
  const [isInputView, setIsInputView] = useState(false)

  const { userAuth, signout } = useAuth()
  const { avatar } = useSelector((state) => state.user)

  const { data: shoppingList } = useGetShoppingListQuery(
    {
      username: userAuth?.spoonacularUsername,
      hash: userAuth?.hash,
    },
    { skip: !userAuth }
  )

  const itemInShoppingList = shoppingList?.aisles
    .map(({ items }) => items.length)
    .reduce((acc, curr) => acc + curr, 0)

  const menu = (
    <Menu mode="vertical">
      <Menu.Item>
        <Link to="account/settings">
          <Space>
            <SettingOutlined /> Edit profile
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="account/favourites">
          <Space>
            <StarOutlined />
            My favourites
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={signout}>
        <Space>
          <LogoutOutlined /> Logout
        </Space>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Header className={style.header}>
        <Row
          className={style.header__row}
          gutter={16}
          align="middle"
          justify="space-between"
        >
          <Col span={4} className={style.header__title}>
            <Link to="/">
              <Title className={style.title} level={1}>
                Fast Dish
              </Title>
            </Link>
          </Col>
          <Col span={14}>
            <Menu mode="horizontal">
              <Menu.Item key="0">
                <Link to="/recipes-menus">Recipes & Menu</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/visualize">Visualize Recipe</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/video">Video</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={userAuth ? 3 : 4}>
            <Space size="large">
              <SearchOutlined
                className={style.icon__search}
                onClick={() => setIsInputView(true)}
              />
              {userAuth ? (
                <>
                  <Link to="account/shopping-list">
                    <Badge count={itemInShoppingList} size="small">
                      <ShoppingOutlined className={style.icon__shopping} />
                    </Badge>
                  </Link>
                  <Dropdown overlay={menu}>
                    <Link to="/account">
                      <Avatar
                        size="large"
                        src={avatar ? avatar : userAuth.photoURL}
                      />
                    </Link>
                  </Dropdown>
                </>
              ) : (
                <Link to="signin" className={style.header__login_link}>
                  <LoginOutlined className={style.icon__link} />
                  Login
                </Link>
              )}
            </Space>
          </Col>
        </Row>
      </Header>
      {isInputView && <SearchInput setIsInputView={setIsInputView} />}
    </>
  )
}

export default MainHeader
