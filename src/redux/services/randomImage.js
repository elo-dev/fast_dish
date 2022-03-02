import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://api.unsplash.com/'
const accessKey = '20jy17vzg1Tv7T_ezBvr_oInq97a5zWgrmkut0UT2yE'

const createRequest = (url) => ({ url })

export const randomImage = createApi({
  reducerPath: 'randomImage',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomImage: builder.query({
      query: () => createRequest(`photos/random?query=food&client_id=${accessKey}`),
    }),
  }),
})

export const { useGetRandomImageQuery } = randomImage
