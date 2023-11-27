import { getIngredients } from '../../utils/constants'

export const INGREDIENTS_LOAD_PROGRESS = 'INGREDIENTS_LOADING'
export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS'
export const INGREDIENTS_LOAD_ERROR = 'INGREDIENTS_LOAD_SUCCESS'

export const loadIngredients = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_LOAD_PROGRESS })
  return getIngredients()
    .then((res) =>
      dispatch({ type: INGREDIENTS_LOAD_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({ type: INGREDIENTS_LOAD_ERROR, payload: error.message })
    )
}
