import { addNewOrder } from '../../utils/api'
import { resetIngredients } from '../constructor-ingredients/action'

export const ORDER_PROGRESS = 'ORDER_PROGRESS'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_ERROR = 'ORDER_ERROR'

export const loadOrder = (arr) => (dispatch) => {
  dispatch({ type: ORDER_PROGRESS })
  return addNewOrder(arr)
    .then((res) => dispatch({ type: ORDER_SUCCESS, payload: res.order.number }))
    .catch((error) => dispatch({ type: ORDER_ERROR, payload: error.message }))
    .finally(() => dispatch(resetIngredients()))
}
