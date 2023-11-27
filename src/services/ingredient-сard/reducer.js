import { INGREDIENT_CARD } from './action'

const initialState = {
  card: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_CARD: {
      return {
        ...state,
        card: action.payload,
      }
    }
    default:
      return state
  }
}
