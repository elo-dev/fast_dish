import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const API_KEY = '66cc565acea24fcbbb226dc647b2a84d'
const API_KEY = '35b6e90449144015b3dbc2e0f3c64d76'
const baseUrl = 'https://api.spoonacular.com/recipes/'

const createRequest = (url) => ({ url })

export const searchRecipe = createApi({
  reducerPath: 'searchRecipe',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipe: builder.query({
      query: ({
        query,
        cuisine,
        type,
        diet,
        equipment,
        sort,
        includeIngredients,
        excludeIngredients,
      }) =>
        createRequest(
          `/complexSearch?query=${query}&addRecipeInformation=true&cuisine=${cuisine}&type=${type}&diet=${diet}&equipment=${equipment}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&sort=${sort}&number=10&apiKey=${API_KEY}`
        ),
    }),
  }),
})

export const { useGetRecipeQuery } = searchRecipe
