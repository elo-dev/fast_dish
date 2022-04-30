import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    addQuery(state, action) {
      state.query = action.payload
    },
  },
})

export default querySlice.reducer

export const { addQuery } = querySlice.actions
