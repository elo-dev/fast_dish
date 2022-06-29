import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, baseUrl } from '../constants'

export const shoppingList = createApi({
  reducerPath: 'shoppingList',
  tagTypes: ['ShoppingList'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getShoppingList: builder.query({
      query: ({ username, hash }) =>
        `/mealplanner/${username}/shopping-list?hash=${hash}&apiKey=${API_KEY}`,
      providesTags: (result) =>
        result
          ? [
              ...result.aisles.map(({ items }) =>
                items.map(({ id }) => ({ type: 'ShoppingList', id }))
              ),
              { type: 'ShoppingList', id: 'LIST' },
            ]
          : [{ type: 'ShoppingList', id: 'LIST' }],
    }),
    addShoppingItem: builder.mutation({
      query: ({ username, hash, item }) => ({
        url: `/mealplanner/${username}/shopping-list/items?hash=${hash}&apiKey=${API_KEY}`,
        method: 'POST',
        body: {
          item: item.original,
          aisle: item.aisle,
          parse: true,
        },
      }),
      invalidatesTags: [{ type: 'ShoppingList', id: 'LIST' }],
    }),
    deleteShoppingItem: builder.mutation({
      query: ({ username, hash, id }) => ({
        url: `/mealplanner/${username}/shopping-list/items/${id}?hash=${hash}&apiKey=${API_KEY}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ShoppingList', id: 'LIST' }],
    }),
  }),
})

export const {
  useAddShoppingItemMutation,
  useGetShoppingListQuery,
  useDeleteShoppingItemMutation,
} = shoppingList
