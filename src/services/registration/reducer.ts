import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getUserFromServer, login, logout } from './action'
import { User } from '../../utils/types'

export type userDataInitialState = {
  user: User
  isAuthChecked: boolean
}

const initialState: userDataInitialState = {
  user: {
    name: '',
    email: '',
  },
  isAuthChecked: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload
        state.user = user
        state.isAuthChecked = true
      })
      .addCase(login.rejected, (state) => {
        state.isAuthChecked = true
      })
      .addCase(logout.pending, (state) => {
        state.isAuthChecked = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user
        state.isAuthChecked = true
      })
      .addCase(logout.rejected, (state) => {
        state.user = initialState.user
        state.isAuthChecked = true
      })
      .addCase(getUserFromServer.pending, (state) => {
        state.isAuthChecked = false
      })
      .addCase(getUserFromServer.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthChecked = true
      })
      .addCase(getUserFromServer.rejected, (state) => {
        state.user = initialState.user
        state.isAuthChecked = true
      })
  },
})

export const { setAuthChecked, setUser } = userSlice.actions

export default userSlice.reducer
