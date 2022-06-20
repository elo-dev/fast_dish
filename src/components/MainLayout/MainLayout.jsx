import { Outlet } from 'react-router'
import { Layout } from 'antd'

import MainHeader from '../Header/Header'

import style from './MainLayout.module.scss'

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Layout className={style.layout}>
        <Outlet />
      </Layout>
    </>
  )
}

export default MainLayout
