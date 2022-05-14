import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const API_KEY = '66cc565acea24fcbbb226dc647b2a84d'
const API_KEY = '35b6e90449144015b3dbc2e0f3c64d76'
const baseUrl = 'https://api.spoonacular.com/recipes/'

const createRequest = (url) => ({ url })

export const recipe = createApi({
  reducerPath: 'recipe',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipeById: builder.query({
      query: (id) =>
        createRequest(
          `${id}/information?includeNutrition=true&apiKey=${API_KEY}`
        ),
    }),
  }),
})

export const { useGetRecipeByIdQuery } = recipe
