import { Layout } from 'antd'
import { Route, Routes } from 'react-router'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'
import DishRecipe from './Pages/DishRecipe/DishRecipe'
import Search from './Pages/Search/Search'

import style from './App.module.scss'

function App() {
  return (
    <Layout className={style.main_layout}>
      <main className={style.main_content}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={<RecipesByCategoryContainer />}
            path="/category/:category"
          />
          <Route element={<DishRecipe />} path="/recipe/:id" />
          <Route element={<Search />} path="/search/">
            <Route path=":recipe" element={null} />
          </Route>
        </Routes>
      </main>
    </Layout>
  )
}

export default App
