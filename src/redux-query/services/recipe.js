import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

const { spoonacularUsername, hash } =
  JSON.parse(localStorage.getItem('spoonacularAuth')) || {}

const createRequest = (url) => ({ url })

export const recipe = createApi({
  reducerPath: 'recipe',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipeById: builder.query({
      query: (id) =>
        createRequest(
          `recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
        ),
    }),
    addRecipe: builder.mutation({
      query: ({ title, slot, date, servings, readyInMinutes, image }) => ({
        url: `mealplanner/${spoonacularUsername}/items?hash=${hash}&apiKey=${API_KEY}`,
        method: 'POST',
        body: {
          date,
          slot,
          position: 0,
          type: 'RECIPE',
          value: {
            id: Math.random(),
            readyInMinutes,
            servings,
            title,
            image,
          },
        },
      }),
    }),
  }),
})

export const { useGetRecipeByIdQuery, useAddRecipeMutation } = recipe
