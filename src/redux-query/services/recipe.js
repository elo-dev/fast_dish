import { API_KEY } from '../constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
