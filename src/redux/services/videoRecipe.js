import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, API_KEY } from '../constants'

export const videoRecipe = createApi({
  reducerPath: 'videoRecipe',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getVideoRecipe: builder.query({
      query: ({ query, type, cuisine, diet, offset, number = 12 }) =>
        `food/videos/search?query=${query}&type=${type}&cuisine=${cuisine}&diet=${diet}&offset=${offset}&number=${number}&apiKey=${API_KEY}`,
    }),
  }),
})

export const { useGetVideoRecipeQuery } = videoRecipe
