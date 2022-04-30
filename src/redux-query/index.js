import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { randomImage } from './services/randomImage'
import { recipe } from './services/recipe'
import { recipes } from './services/recipes'
import { searchRecipe } from './services/searchRecipe'
import filterSlice from './toolkitSlice/filterSlice'
import querySlice from './toolkitSlice/querySlice'

const rootReducer = combineReducers({
  filter: filterSlice,
  query: querySlice,
  [randomImage.reducerPath]: randomImage.reducer,
  [recipes.reducerPath]: recipes.reducer,
  [recipe.reducerPath]: recipe.reducer,
  [searchRecipe.reducerPath]: searchRecipe.reducer,
})

export default configureStore({
  reducer: rootReducer,
})
