import ReactDOM from 'react-dom/client'

export const root = ReactDOM.createRoot(document.getElementById('root'))
export const rootModal = document.getElementById('modals')
export const apiIngredients =
  'https://norma.nomoreparties.space/api/ingredients'
export const orderNumberApi = 'https://norma.nomoreparties.space/api/orders'

export const getIngredients = () => {
  return fetch(apiIngredients)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .catch(console.error)
}

export const addNewOrder = (arr) => {
  return fetch(orderNumberApi, {
    method: 'POST',
    headers: {
      authorization: '08ca101b-72c0-46c7-a5af-c036f69dd465',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .catch(console.error)
}
