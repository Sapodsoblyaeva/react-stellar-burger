import { v1 as uuidv1 } from 'uuid'

export const BURGER_INGREDIENTS_ADD = 'BURGER_INGREDIENTS_ADD'
export const BURGER_INGREDIENTS_DELETE = 'BURGER_INGREDIENTS_DELETE'

export const addIngredient = (item) => ({
  type: BURGER_INGREDIENTS_ADD,
  payload: { item, key: uuidv1() },
})

export const deleteIngredient = (id) => ({
  type: BURGER_INGREDIENTS_DELETE,
  payload: id,
})

// const orderNumberFromApi = () => {
//     let arr = []
//     components.component.map((item) => {
//       arr.push(item._id)
//     })
//     addNewOrder(arr).then((result) => {
//       setOrderNumber(result.order.number)
//       openModal()
//     })
//   }

// export const loadIngredients = () => (dispatch) => {
//   dispatch({ type: INGREDIENTS_LOAD_PROGRESS })
//   return getIngredients()
//     .then(
//       (res) =>
//         // console.log(result.data)
//         dispatch({ type: INGREDIENTS_LOAD_SUCCESS, payload: res.data })
//       // dispatch({ type: INGREDIENTS_LOAD_SUCCESS, payload: result.data })
//     )
//     .catch((error) =>
//       dispatch({ type: INGREDIENTS_LOAD_ERROR, payload: error.message })
//     )
// }
