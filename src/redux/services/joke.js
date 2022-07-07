import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

export const joke = createApi({
  reducerPath: 'joke',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getJoke: builder.query({
      query: () => `food/jokes/random?apiKey=${API_KEY}`,
    }),
  }),
})

export const { useGetJokeQuery } = joke
