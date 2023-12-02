import ReactDOM from 'react-dom/client'

export const root = ReactDOM.createRoot(document.getElementById('root'))
export const rootModal = document.getElementById('modals')

export const baseUrl = 'https://norma.nomoreparties.space/api'

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
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
      authorization: '08ca101b-72c0-46c7-a5af-c036f69dd465',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  })
}
