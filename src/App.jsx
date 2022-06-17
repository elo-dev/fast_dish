import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'

import { Layout } from 'antd'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'
import DishRecipe from './Pages/DishRecipe/DishRecipe'
import Search from './Pages/Search/Search'
import RecipesAndMenu from './Pages/RecipesAndMenu/RecipesAndMenu'
import CreateMealPlan from './Pages/CreateMealPlan/CreateMealPlan'
import Registration from './Pages/Registration/Registration'
import Authorization from './Pages/Authorization/Authorization'
import NotFound from './Pages/NotFound/NotFound'

import style from './App.module.scss'

function App() {
  const { userAuth } = useAuth()

  const RequiereAuth = ({ children }) => {
    return userAuth ? children : <Navigate to="/signin" />
  }

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
          <Route element={<RecipesAndMenu />} path="/recipes-menus" />
          <Route
            element={
              <RequiereAuth>
                <CreateMealPlan />
              </RequiereAuth>
            }
            path="/account/menu"
          />
          <Route
            element={userAuth ? <Navigate to="/" /> : <Registration />}
            path="/signup"
          />
          <Route
            element={userAuth ? <Navigate to="/" /> : <Authorization />}
            path="/signin"
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
