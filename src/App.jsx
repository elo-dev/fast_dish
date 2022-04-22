import { Layout } from 'antd'
import { Route, Routes, useLocation } from 'react-router'

import MainHeader from './components/Header/Header'
import SearchHeader from './components/SearchHeader/SearchHeader'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'
import DishRecipe from './Pages/DishRecipe/DishRecipe'
import Search from './Pages/Search/Search'

import style from './App.module.scss'

function App() {
  const location = useLocation()

  return (
    <Layout className={style.main_layout}>
      {location.pathname === '/search' ? <SearchHeader /> : <MainHeader />}
      <main className={style.main_content}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={<RecipesByCategoryContainer />}
            path="category/:category"
          />
          <Route element={<DishRecipe />} path=":id" />
          <Route element={<Search />} path="/search" />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
