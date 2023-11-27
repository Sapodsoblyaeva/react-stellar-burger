import {
  INGREDIENTS_LOAD_ERROR,
  INGREDIENTS_LOAD_PROGRESS,
  INGREDIENTS_LOAD_SUCCESS,
} from './action'

const initialState = {
  ingredients: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_LOAD_PROGRESS: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case INGREDIENTS_LOAD_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
      }
    }
    case INGREDIENTS_LOAD_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}
