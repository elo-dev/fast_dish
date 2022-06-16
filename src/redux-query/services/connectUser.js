import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

export const connectUser = createApi({
  reducerPath: 'connectUser',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    connectUser: builder.mutation({
      query: (body) => ({
        url: `users/connect?apiKey=${API_KEY}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useConnectUserMutation } = connectUser
