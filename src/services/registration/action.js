import {
  fetchWithRefresh,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../../utils/constants'

export const SET_USER = 'SET_USER'
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
})

export const getUserFromServer = () => (dispatch) => {
  return fetchWithRefresh().then((res) => {
    dispatch(setUser(res.user))
  })
}

export const register = (email, pass, name) => (dispatch) => {
  return registerUser(email, pass, name).then((res) => {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    dispatch(setUser(res.user))
    dispatch(setAuthChecked(true))
  })
}

export const login = (email, pass) => (dispatch) => {
  return loginUser(email, pass).then((res) => {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('name', res.user.name)
    localStorage.setItem('email', res.user.email)
    dispatch(setUser(res.user))
    dispatch(setAuthChecked(true))
  })
}

export const checkUserAuth = () => (dispatch) => {
  if (localStorage.getItem('accessToken')) {
    //если без диспатч, то каждыц раз просит логин (так как в хранилище пользователь не сохраняется)
    //а если без fetchWithRequest постоянно вылетает ошибка с catch(видимо getUserFromServer undefined возвращает)
    dispatch(getUserFromServer())
    fetchWithRefresh()
      .catch(() => {
       localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(setUser(null))
      })
      .finally(() => dispatch(setAuthChecked(true)))
  } else {
    dispatch(setAuthChecked(true))
  }
}

export const logout = () => (dispatch) => {
  return logoutUser().then(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    dispatch(setUser(null))
  })
}
