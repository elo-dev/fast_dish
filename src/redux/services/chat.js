import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

export const chat = createApi({
  reducerPath: 'chat',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAnswer: builder.query({
      query: ({ question }) =>
        `food/converse?text=${question}&apiKey=${API_KEY}`,
    }),
  }),
})

export const { useGetAnswerQuery } = chat
