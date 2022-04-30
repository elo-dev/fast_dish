import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = '66cc565acea24fcbbb226dc647b2a84d'
const baseUrl = 'https://api.spoonacular.com/recipes/'

const createRequest = (url) => ({ url })

export const searchRecipe = createApi({
  reducerPath: 'searchRecipe',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipe: builder.query({
      query: ({ query, cuisine, type, diet, equipment }) =>
        createRequest(
          `/complexSearch?query=${query}&addRecipeInformation=true&cuisine=${cuisine}&type=${type}&diet=${diet}&equipment=${equipment}&number=10&apiKey=${API_KEY}`
        ),
    }),
  }),
})

export const { useGetRecipeQuery } = searchRecipe
