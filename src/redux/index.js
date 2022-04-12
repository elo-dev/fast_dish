import { configureStore } from '@reduxjs/toolkit'
import { randomImage } from './services/randomImage'
import { recipe } from './services/recipe'
import { recipes } from './services/recipes'

export default configureStore({
  reducer: {
    [randomImage.reducerPath]: randomImage.reducer,
    [recipes.reducerPath]: recipes.reducer,
    [recipe.reducerPath]: recipe.reducer,
  },
})
