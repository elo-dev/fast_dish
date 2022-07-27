import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Col, Divider, Image, Layout, Row, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { onValue, ref } from 'firebase/database'
import { db } from '../../firebase'

import { setAboutMe } from '../../redux/toolkitSlice/userSlice'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import cn from 'classnames'

import style from './Account.module.scss'

const { Title, Text } = Typography

const Account = () => {
  const dispatch = useDispatch()
  const { userAuth } = useAuth()
  const { username, aboutMe, avatar } = useSelector((state) => state.user)

  const isSmallMediaMatch = useMediaMatch('(max-width: 768px)')
  const isMediumMediaMatch = useMediaMatch('(max-width: 1200px)')
  const isLargeMediaMatch = useMediaMatch('(min-width: 1200px)')

  useEffect(() => {
    if (userAuth !== null) {
      const starCountRef = ref(db, `user/${userAuth.uid}`)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        dispatch(setAboutMe({ aboutMe: data.aboutMe }))
      })
    }
  }, [])

  const activeNav = ({ isActive }) =>
    cn(style.content__tab, {
      [style.content__tab_active]: isActive,
    })

  return (
    <Layout className={style.account}>
      <Row justify="space-between" gutter={[24, 24]}>
        <Col xs={24} xl={8}>
          <div className={cn(style.info, style.account__container)}>
            <Space
              direction={
                isSmallMediaMatch
                  ? 'vertical'
                  : isMediumMediaMatch
                  ? 'horizontal'
                  : 'vertical'
              }
              size="middle"
            >
              {userAuth?.photoURL ? (
                <Image
                  src={avatar ? avatar : userAuth.photoURL}
                  preview={false}
                  className={style.info__img}
                />
              ) : (
                <UserOutlined className={style.info__without_img} />
              )}
              <Space
                direction={
                  isSmallMediaMatch
                    ? 'vertical'
                    : isLargeMediaMatch
                    ? 'vertical'
                    : 'horizontal'
                }
              >
                <Title>{username ? username : userAuth?.displayName}</Title>
                <Text className={style.info__description}>{aboutMe}</Text>
              </Space>
              <Link to="settings" className={style.info__link_settings}>
                Settings
              </Link>
            </Space>
          </div>
        </Col>

        <Col xs={24} xl={16}>
          <div className={cn(style.content, style.account__container)}>
            <div className={style.content__header}>
              <Space split={<Divider type="vertical" />}>
                <NavLink className={activeNav} to="meal-week">
                  Meal Plan Week
                </NavLink>
                <NavLink className={activeNav} to="meal-day">
                  Meal Plan Day
                </NavLink>
                <NavLink className={activeNav} to="shopping-list">
                  Shopping list
                </NavLink>
                <NavLink className={activeNav} to="favourites">
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
