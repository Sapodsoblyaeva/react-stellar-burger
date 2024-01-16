import { addNewOrder, getOrder } from '../../utils/api'
import { resetIngredients } from '../constructor-ingredients/action'

export const ORDER_PROGRESS = 'ORDER_PROGRESS'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_ERROR = 'ORDER_ERROR'
export const ORDER_SEARCH_SUCCESS = 'ORDER_SEARCH_SUCCESS'

export const loadOrder = (arr) => (dispatch) => {
  dispatch({ type: ORDER_PROGRESS })
  return addNewOrder(arr)
    .then((res) => dispatch({ type: ORDER_SUCCESS, payload: res.order.number }))
    .catch((error) => dispatch({ type: ORDER_ERROR, payload: error.message }))
    .finally(() => dispatch(resetIngredients()))
}

export const findOrder = (number) => (dispatch) => {
  dispatch({ type: ORDER_PROGRESS })
  return getOrder(number)
    .then((res) =>
      dispatch({ type: ORDER_SEARCH_SUCCESS, payload: res.orders[0] })
    )
    .catch((error) => dispatch({ type: ORDER_ERROR, payload: error.message }))
}
