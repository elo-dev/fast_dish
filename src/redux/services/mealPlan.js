import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

export const mealPlan = createApi({
  reducerPath: 'mealPlan',
  tagTypes: ['MealPlan'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMealPlanWeek: builder.query({
      query: ({ username, date, hash }) =>
        `/mealplanner/${username}/week/${date}?hash=${hash}&apiKey=${API_KEY}`,
      providesTags: (result) =>
        result
          ? [
              ...result.days.map(({ items }) =>
                items.map(({ id }) => ({ type: 'MealPlan', id }))
              ),
              { type: 'MealPlan', id: 'LIST' },
            ]
          : [{ type: 'MealPlan', id: 'LIST' }],
    }),
    getMealPlanDay: builder.query({
      query: ({ username, date, hash }) =>
        `/mealplanner/${username}/day/${date}?hash=${hash}&apiKey=${API_KEY}`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'MealPlan', id })),
              { type: 'MealPlan', id: 'LIST' },
            ]
          : [{ type: 'MealPlan', id: 'LIST' }],
    }),
    deleteMealPlan: builder.mutation({
      query: ({ id, username, hash }) => ({
        url: `/mealplanner/${username}/items/${id}?hash=${hash}&apiKey=${API_KEY}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'MealPlan', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMealPlanDayQuery,
  useGetMealPlanWeekQuery,
  useDeleteMealPlanMutation,
} = mealPlan
