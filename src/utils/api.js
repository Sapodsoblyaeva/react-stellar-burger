export const baseUrl = 'https://norma.nomoreparties.space/api'

export function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function request(endpoint, options) {
  return fetch(`${baseUrl}/${endpoint}`, options).then(checkResponse)
}

export const getIngredients = () => {
  return request('ingredients')
}

export const addNewOrder = (arr) => {
  return request('orders', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('accessToken'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  }).catch((err) => console.log(err))
}

export const resetPassword = (value) => {
  return request('password-reset', {
    method: 'POST',
    body: {
      email: value,
    },
  }).catch((err) => console.log(err))
}

export const successResetPassword = (value) => {
  localStorage.removeItem('emailProvided')
  return request('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      password: value,
      token: '',
    }),
  }).catch((err) => console.log(err))
}

export const refreshToken = () => {
  return request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
  //без catch так как кетч идет дальше в коде в функции fetchwithrefresh, иначе там кетч не отрабатывает
}

export const getUser = (authKey) => {
  return request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authKey,
    },
  }).then((res) => ({
    user: res.user,
  }))
  //без catch так как кетч идет дальше в коде в функции fetchwithrefresh, иначе там кетч не отрабатывает
}

export const fetchWithRefresh = () => {
  return getUser(localStorage.getItem('accessToken')).catch((err) => {
    if (err.message === 'jwt expired') {
      console.log('jwt expired', err.message)
      refreshToken()
        .then((res) => {
          if (!res.sucesss) {
            console.log('res unsuccessfull', !res.success)
            return Promise.reject(res)
          }
          console.log('successresult', res)
          localStorage.setItem('refreshToken', res.refreshToken)
          localStorage.setItem('accessToken', res.accessToken)
          return getUser(res.accessToken)
        })
        .catch(
          (err) => console.log('refreshToken error', err),
          localStorage.removeItem('accessToken'),
          localStorage.removeItem('refreshToken')
        )
    } else {
      console.log('errorintheend', Promise.reject(err))
      return Promise.reject(err)
    }
  })
}

export const loginUser = (emailValue, passValue) => {
  return request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailValue,
      password: passValue,
    }),
  })
    .then((res) => ({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
    }))
    .catch((err) => console.log(err))
}

export const registerUser = (emailValue, passwordValue, usernameValue) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
      name: usernameValue,
    }),
  })
    .then((res) => ({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
    }))
    .catch((err) => console.log(err))
}

export const logoutUser = () => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).catch((err) => console.log(err))
}

export const changeUser = ({ nameValue, passwordValue }) => {
  return request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      name: nameValue,
      password: passwordValue,
    }),
  }).catch((err) => console.log(err))
}
