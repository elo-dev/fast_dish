import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'

import Home from './Pages/Home/Home'
import { RecipesByCategoryContainer } from './Pages/RecipesByCategory/RecipesByCategoryContainer'
import DishRecipe from './Pages/DishRecipe/DishRecipe'
import Search from './Pages/Search/Search'
import RecipesAndMenu from './Pages/RecipesAndMenu/RecipesAndMenu'
import CreateMealPlan from './Pages/CreateMealPlan/CreateMealPlan'
import Registration from './Pages/Registration/Registration'
import Authorization from './Pages/Authorization/Authorization'
import Account from './Pages/Account/Account'
import NotFound from './Pages/NotFound/NotFound'

import MainLayout from './components/MainLayout/MainLayout'
import MealPlanWeek from './components/MealPlanWeek/MealPlanWeek'
import MealPlanDay from './components/MealPlanDay/MealPlanDay'
import ShoppingList from './components/ShoppingList/ShoppingList'
import Favourites from './components/Favourites/Favourites'
import Settings from './components/Settings/Settings'
import Joke from './components/Joke/Joke'
import Chat from './components/Chat/Chat'
import SearchVideo from './Pages/SearchVideo/SearchVideo'
import VideoModal from './components/VideoModal/VideoModal'
import VisualizeRecipeForm from './Pages/VisualizeRecipeForm/VisualizeRecipeForm'
import VisualizeCard from './Pages/VisualizeCard/VisualizeCard'

function App() {
  const { userAuth } = useAuth()

  const RequiereAuth = ({ children }) => {
    return userAuth ? children : <Navigate to="/signin" />
  }

  return (
    <>
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
                <Account />
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
                <CreateMealPlan />
              </RequiereAuth>
            }
            path="account/menu"
          />

          <Route
            element={
              <RequiereAuth>
                <VisualizeRecipeForm />
              </RequiereAuth>
            }
            path="visualize/create"
          />

          <Route element={<VisualizeCard />} path="/visualize" />

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
      <Chat />
    </>
  )
}

export default App
