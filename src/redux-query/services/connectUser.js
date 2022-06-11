import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY } from '../constants'

const baseUrl = 'https://api.spoonacular.com/users/'

export const connectUser = createApi({
  reducerPath: 'connectUser',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    connectUser: builder.mutation({
      query: (body) => ({
        url: `connect?apiKey=${API_KEY}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useConnectUserMutation } = connectUser
