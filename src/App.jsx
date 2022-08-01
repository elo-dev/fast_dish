import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'
import { THEME_DARK, THEME_LIGHT, useTheme } from './context/ThemeProvider'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'
import DishRecipe from './Pages/DishRecipe/DishRecipe'
import Search from './Pages/Search/Search'
import RecipesAndMenu from './Pages/RecipesAndMenu/RecipesAndMenu'
import SearchVideo from './Pages/SearchVideo/SearchVideo'
import Registration from './Pages/Registration/Registration'
import Authorization from './Pages/Authorization/Authorization'
import NotFound from './Pages/NotFound/NotFound'

import MainLayout from './components/MainLayout/MainLayout'
import MealPlanWeek from './components/MealPlanWeek/MealPlanWeek'
import MealPlanDay from './components/MealPlanDay/MealPlanDay'
import ShoppingList from './components/ShoppingList/ShoppingList'
import Favourites from './components/Favourites/Favourites'
import Settings from './components/Settings/Settings'
import Joke from './components/Joke/Joke'
import Chat from './components/Chat/Chat'
import VideoModal from './components/VideoModal/VideoModal'
import Loading from './components/Loading/Loading'

import './index.scss'

const LazyCreateMealPlan = lazy(() =>
  import('./Pages/CreateMealPlan/CreateMealPlan')
)

const LazyAccount = lazy(() => import('./Pages/Account/Account'))

const LazyVisualizeCard = lazy(() =>
  import('./Pages/VisualizeCard/VisualizeCard')
)

const LazyVisualizeRecipeForm = lazy(() =>
  import('./Pages/VisualizeRecipeForm/VisualizeRecipeForm')
)

function App() {
  const { userAuth } = useAuth()
  const { isDarkMode } = useTheme()

  const RequiereAuth = ({ children }) => {
    return userAuth ? children : <Navigate to="/signin" />
  }

  return (
    <>
      <div className="app" data-theme={isDarkMode ? THEME_DARK : THEME_LIGHT}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              element={<RecipesByCategoryContainer />}
              path="category/:category"
            />
            <Route element={<DishRecipe />} path="recipe/:id" />

            <Route element={<RecipesAndMenu />} path="recipes-menus" />

            <Route
              element={
                <RequiereAuth>
                  <Suspense fallback={<Loading />}>
                    <LazyAccount />
                  </Suspense>
                </RequiereAuth>
              }
              path="account"
            >
              <Route element={<Joke />} index />
              <Route element={<MealPlanWeek />} path="meal-week" />
              <Route element={<MealPlanDay />} path="meal-day" />
              <Route element={<ShoppingList />} path="shopping-list" />
              <Route element={<Favourites />} path="favourites" />
              <Route element={<Settings />} path="settings" />
            </Route>

            <Route
              element={
                <RequiereAuth>
                  <Suspense fallback={<Loading />}>
                    <LazyCreateMealPlan />
                  </Suspense>
                </RequiereAuth>
              }
              path="account/menu"
            />

            <Route
              element={
                <RequiereAuth>
                  <Suspense fallback={<Loading />}>
                    <LazyVisualizeRecipeForm />
                  </Suspense>
                </RequiereAuth>
              }
              path="visualize/create"
            />

            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <LazyVisualizeCard />
                </Suspense>
              }
              path="/visualize"
            />

            <Route element={<SearchVideo />} path="video">
              <Route element={<VideoModal />} path=":id" />
            </Route>
          </Route>

          <Route index element={<Home />} />

          <Route element={<Search />} path="search">
            <Route element={<Search />} path=":recipe" />
          </Route>

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
      </div>
      <Chat />
    </>
  )
}

export default App
