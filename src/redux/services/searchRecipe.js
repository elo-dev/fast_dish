import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

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
        offset,
        number,
      }) =>
        createRequest(
          `recipes/complexSearch?query=${query}&addRecipeInformation=true&cuisine=${cuisine}&type=${type}&diet=${diet}&equipment=${equipment}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&sort=${sort}&number=${number}&offset=${offset}&apiKey=${API_KEY}`
        ),
    }),
  }),
})

export const { useGetRecipeQuery } = searchRecipe
