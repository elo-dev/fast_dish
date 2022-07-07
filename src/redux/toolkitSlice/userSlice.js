import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  token: null,
  username: null,
  email: null,
  aboutMe: null,
  avatar: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id
      state.token = action.payload.token
      state.username = action.payload.username
      state.email = action.payload.email
    },
    setUsername(state, action) {
      state.username = action.payload.username
    },
    setEmail(state, action) {
      state.email = action.payload.email
    },
    setAvatar(state, action) {
      state.avatar = action.payload.avatar
    },
    setAboutMe(state, action) {
      state.aboutMe = action.payload.aboutMe
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

export const {
  setUser,
  removeUser,
  setAboutMe,
  setAvatar,
  setEmail,
  setUsername,
} = userSlice.actions

export default userSlice.reducer
