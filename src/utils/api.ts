import { baseUrl } from './constants'
import {
  ProfileOrdersFromServer,
  UserChange,
  UserResponseFromServer,
} from './types'

type ResponseCustomized<T> = {
  json(): Promise<T>
  ok: boolean
  status: number
  statusText: string
}

export type RefreshResponse = UserResponseFromServer & { success: boolean }

export const checkResponse = <T>(res: ResponseCustomized<T>): Promise<T> => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject({ message: res.statusText })
  }
}

export const request = <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${baseUrl}/${endpoint}`, options).then((res) => {
    return checkResponse<T>(res as ResponseCustomized<T>)
  })
}

export const getIngredients = () => {
  return request('ingredients')
}

export const resetPassword = (value: string) => {
  return request<UserResponseFromServer>('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: value,
    }),
  })
}

export const successResetPassword = (value: string) => {
  localStorage.removeItem('emailProvided')
  return request<UserResponseFromServer>('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      password: value,
      token: '',
    }),
  })
}

export const refreshToken = () => {
  return request<UserResponseFromServer>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
}

export const getUser = (authKey: string) => {
  return request<UserResponseFromServer>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authKey,
    },
  }).then((res: UserResponseFromServer) => ({
    user: res.user,
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
  }))
}

export const loginUser = (emailValue: string, passValue: string) => {
  return request<UserResponseFromServer>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailValue,
      password: passValue,
    }),
  }).then((res: UserResponseFromServer) => ({
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    user: res.user,
  }))
}

export const fetchWithRefresh = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  return getUser(accessToken).catch((err) => {
    if (err.message === 'jwt expired') {
      console.log('jwt expired', err.message)
      refreshToken()
        .then((res: unknown) => {
          const refreshResponse = res as RefreshResponse
          if (refreshResponse.success) {
            console.log('successresult from refreshtoken', res)
            localStorage.setItem('refreshToken', refreshResponse.refreshToken)
            localStorage.setItem('accessToken', refreshResponse.accessToken)
            return getUser(refreshResponse.accessToken)
          }
          console.log(
            'res unsuccessfull from refreshToken',
            !refreshResponse.success
          )
          return Promise.reject(res)
        })
        .catch((err) => {
          console.log('refreshToken error', err)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          return Promise.reject(err)
        })
    } else {
      console.log('error in the end', err)
      return Promise.reject(err)
    }
  })
}

export const registerUser = (
  emailValue: string,
  passwordValue: string,
  usernameValue: string
) => {
  return request<UserResponseFromServer>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
      name: usernameValue,
    }),
  }).then((res: UserResponseFromServer) => ({
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    user: res.user,
  }))
}

export const logoutUser = () => {
  return request<UserResponseFromServer>('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
}

export const changeUser = ({ name, pass }: UserChange) => {
  const accessToken = localStorage.getItem('accessToken') || ''
  return request<UserResponseFromServer>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
    body: JSON.stringify({
      name: name,
      password: pass,
    }),
  })
}

export const getOrder = (number: number) => {
  return request<ProfileOrdersFromServer>(`orders/${number}`)
}

export const addNewOrder = (arr: string[]) => {
  const accessToken = localStorage.getItem('accessToken') || ''
  return request<ProfileOrdersFromServer>('orders', {
    method: 'POST',
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  })
}
