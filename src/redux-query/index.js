import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { randomImage } from './services/randomImage'
import { recipe } from './services/recipe'
import { recipes } from './services/recipes'
import { searchRecipe } from './services/searchRecipe'
import { connectUser } from './services/connectUser'
import filterSlice from './toolkitSlice/filterSlice'
import userSlice from './toolkitSlice/userSlice'

const rootReducer = combineReducers({
  filter: filterSlice,
  user: userSlice,
  [randomImage.reducerPath]: randomImage.reducer,
  [recipes.reducerPath]: recipes.reducer,
  [recipe.reducerPath]: recipe.reducer,
  [searchRecipe.reducerPath]: searchRecipe.reducer,
  [connectUser.reducerPath]: connectUser.reducer,
})

export default configureStore({
  reducer: rootReducer,
})
