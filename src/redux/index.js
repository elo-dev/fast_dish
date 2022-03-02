import { configureStore } from '@reduxjs/toolkit'
import { randomImage } from './services/randomImage'
import { recipes } from './services/recipes'

export default configureStore({
  reducer: {
    [randomImage.reducerPath]: randomImage.reducer,
    [recipes.reducerPath]: recipes.reducer,
  },
})
