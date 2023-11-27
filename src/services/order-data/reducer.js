import { ORDER_ERROR, ORDER_PROGRESS, ORDER_SUCCESS } from './action'

const initialState = {
  orderNumber: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        loading: false,
      }
    }
    case ORDER_PROGRESS: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case ORDER_ERROR: {
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
