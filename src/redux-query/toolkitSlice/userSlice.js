import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  token: null,
  name: null,
  username: null,
  email: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id
      state.token = action.payload.token
      state.name = action.payload.name
      state.username = action.payload.username
      state.email = action.payload.email
    },
    removeUser(state) {
      state.id = null
      state.token = null
      state.name = null
      state.username = null
      state.email = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
