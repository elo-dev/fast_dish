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
  Switch,
} from 'antd'

import {
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  StarOutlined,
  SettingOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  EyeOutlined,
  SmileOutlined,
  FormOutlined,
  RocketOutlined,
} from '@ant-design/icons'

import { useGetShoppingListQuery } from '../../redux/services/shoppingList'

import { useAuth } from '../../hooks/useAuth'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useTheme } from '../../context/ThemeProvider'

import SearchInput from '../SearchInput/SearchInput'

import cn from 'classnames'

import style from './Header.module.scss'

const { Header } = Layout
const { Title } = Typography

const MainHeader = () => {
  const [isInputView, setIsInputView] = useState(false)
  const isSmallMediaMatch = useMediaQuery('(max-width: 992px)')
  const { isDarkMode, changeTheme } = useTheme()

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
      <Menu.Item key="0">
        <Link to="account/settings">
          <Space>
            <SettingOutlined /> Edit profile
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="account/favourites">
          <Space>
            <StarOutlined />
            My favourites
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={signout}>
        <Space>
          <LogoutOutlined /> Logout
        </Space>
      </Menu.Item>
    </Menu>
  )

  const smallMenu = (
    <Menu mode="vertical">
      <Menu.Item key="0">
        <Link to="account">
          <Space>
            <SmileOutlined /> Profile
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/video">
          <Space>
            <VideoCameraOutlined /> Video
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setIsInputView(true)}>
        <Space>
          <SearchOutlined /> Search
        </Space>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/visualize">
          <Space>
            <EyeOutlined /> Visualize
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/account/menu">
          <Space>
            <FormOutlined /> Create Menu
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="account/favourites">
          <Space>
            <StarOutlined />
            My favourites
          </Space>
        </Link>
      </Menu.Item>
      {userAuth ? (
        <Menu.Item key="6" onClick={signout}>
          <Space>
            <LogoutOutlined /> Logout
          </Space>
        </Menu.Item>
      ) : (
        <Menu.Item key="6">
          <Link to="/signin" className={style.link__signIn}>
            <Space>
              <RocketOutlined /> Sign In
            </Space>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <>
      <Header className={style.header}>
        <Row
          className={style.header__wrapper}
          gutter={16}
          align="middle"
          justify="space-between"
        >
          <Col md={4} lg={5} xl={4}>
            <Link to="/">
              <Title className={style.title} level={1}>
                Fast Dish
              </Title>
            </Link>
          </Col>
          {!isSmallMediaMatch ? (
            <>
              <Col md={15} lg={12} xl={11}>
                <Menu mode="horizontal" className={style.header__menu}>
                  <Menu.Item key="0">
                    <Link to="/recipes-menus" className={style.menu__item}>
                      Recipes & Menu
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/visualize/create" className={style.menu__item}>
                      Visualize Recipe
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/video" className={style.menu__item}>
                      Video
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/visualize" className={style.menu__item}>
                      Visualize
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col md={userAuth ? 5 : 5} lg={userAuth ? 5 : 7} xl={5}>
                <Space size="large">
                  <SearchOutlined
                    className={style.icon__search}
                    onClick={() => setIsInputView(true)}
                  />
                  <Switch
                    className={cn(style.toggleSwitch, {
                      [style.toggleSwitch__dark]: isDarkMode,
                    })}
                    onChange={changeTheme}
                    checked={isDarkMode}
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
            </>
          ) : (
            <Space size="large" align='center'>
              <Switch
                className={cn(style.toggleSwitch, {
                  [style.toggleSwitch__dark]: isDarkMode,
                })}
                onChange={changeTheme}
                checked={isDarkMode}
              />
              <Dropdown overlay={smallMenu}>
                <MenuOutlined className={style.icon__menu} />
              </Dropdown>
            </Space>
          )}
        </Row>
      </Header>
      {isInputView && <SearchInput setIsInputView={setIsInputView} />}
    </>
  )
}

export default MainHeader
