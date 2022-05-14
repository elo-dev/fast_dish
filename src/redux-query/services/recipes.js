import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const API_KEY = '66cc565acea24fcbbb226dc647b2a84d'
const API_KEY = '35b6e90449144015b3dbc2e0f3c64d76'
const baseUrl = `https://api.spoonacular.com/recipes/`
const moreRecipeInfo = 'addRecipeInformation=true'
const recipeNutrition = 'addRecipeNutrition=true'

const createRequest = (url) => ({ url })

export const recipes = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomRecipes: builder.query({
      query: () => createRequest(`random/?number=3&apiKey=${API_KEY}`),
    }),
    getRecipesByCuisine: builder.query({
      query: (country) =>
        createRequest(
          `complexSearch?cuisine=${country}&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getLowCaloriesRecipes: builder.query({
      query: (mealType) =>
        createRequest(
          `complexSearch?type=${mealType}&maxCalories=200&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getFastRecipes: builder.query({
      query: (mealType) =>
        createRequest(
          `complexSearch?type=${mealType}&maxReadyTime=20&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getDietRecipes: builder.query({
      query: (mealType, diet) =>
        createRequest(
          `complexSearch?type=${mealType}&diet=${diet}${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getSimilarRecipes: builder.query({
      query: (id) => createRequest(`${id}/similar?number=4&apiKey=${API_KEY}`),
    }),
  }),
})

export const {
  useGetRandomRecipesQuery,
  useGetRecipesByCuisineQuery,
  useGetLowCaloriesRecipesQuery,
  useGetFastRecipesQuery,
  useGetDietRecipesQuery,
  useGetSimilarRecipesQuery,
} = recipes
