import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchWithRefresh,
  loginUser,
  logoutUser,
  registerUser,
} from '../../utils/api'
import { setAuthChecked, setUser } from './reducer'
import { AppDispatch } from '../../hooks/useDispatch'
import {
  UserLogin,
  UserRegister,
  UserResponseFromServer,
} from '../../utils/types'

export const login = createAsyncThunk<UserResponseFromServer, UserLogin>(
  'user/login',
  async (data) => {
    const { email, pass } = data
    const res = await loginUser(email, pass)
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('name', res.user.name)
    localStorage.setItem('email', res.user.email)
    setAuthChecked(true)
    return res
  }
)

export const register = createAsyncThunk<UserResponseFromServer, UserRegister>(
  'user/register',
  async (data) => {
    const { email, pass, name } = data
    const res = await registerUser(email, pass, name)
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    setUser(res.user)
    setAuthChecked(true)
    return res
  }
)

export const getUserFromServer = createAsyncThunk<UserResponseFromServer>(
  'user/getUserFromServer',
  async () => {
    const res = await fetchWithRefresh()
    if (res) {
      const { user, accessToken, refreshToken } = res
      setAuthChecked(true)
      return {
        user,
        accessToken,
        refreshToken,
      }
    } else {
      throw new Error('something went wrong')
    }
  }
)

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem('accessToken')) {
    try {
      dispatch(getUserFromServer())
    } catch (err) {
      dispatch(setUser({ name: '', email: '' }))
      throw err
    }
  } else {
    dispatch(setAuthChecked(true))
  }
}

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutUser()
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  setUser({ name: '', email: '' })
})
