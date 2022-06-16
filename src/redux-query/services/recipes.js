import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl, moreRecipeInfo, recipeNutrition } from '../constants'

const createRequest = (url) => ({ url })

export const recipes = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomRecipes: builder.query({
      query: (count) =>
        createRequest(`recipes/random/?number=${count}&apiKey=${API_KEY}`),
    }),
    getRecipesByCuisine: builder.query({
      query: (country) =>
        createRequest(
          `recipes/complexSearch?cuisine=${country}&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getLowCaloriesRecipes: builder.query({
      query: (mealType) =>
        createRequest(
          `recipes/complexSearch?type=${mealType}&maxCalories=200&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getFastRecipes: builder.query({
      query: (mealType) =>
        createRequest(
          `recipes/complexSearch?type=${mealType}&maxReadyTime=20&${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getDietRecipes: builder.query({
      query: (mealType, diet) =>
        createRequest(
          `recipes/complexSearch?type=${mealType}&diet=${diet}${moreRecipeInfo}&${recipeNutrition}&number=10&apiKey=${API_KEY}`
        ),
    }),
    getSimilarRecipes: builder.query({
      query: (id) =>
        createRequest(`recipes/${id}/similar?number=4&apiKey=${API_KEY}`),
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
