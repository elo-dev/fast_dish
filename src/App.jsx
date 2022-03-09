import { Layout } from 'antd'
import { Route, Routes } from 'react-router'

import MainHeader from './components/Header/Header'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'

import style from './App.module.scss'

function App() {
  return (
    <Layout className={style.main_layout}>
      <MainHeader />
      <main className={style.main_content}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={<RecipesByCategoryContainer />}
            path="category/:category"
          />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
