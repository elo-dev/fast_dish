import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = '66cc565acea24fcbbb226dc647b2a84d'
const baseUrl = `https://api.spoonacular.com/recipes/`

const createRequest = (url) => ({ url })

export const recipes = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomRecipes: builder.query({
      query: () => createRequest(`random/?number=3&apiKey=${API_KEY}`),
    }),
  }),
})

export const { useGetRandomRecipesQuery } = recipes
