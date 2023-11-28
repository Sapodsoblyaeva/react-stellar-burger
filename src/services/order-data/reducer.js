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
        loadingProcess: false,
      }
    }
    case ORDER_PROGRESS: {
      return {
        ...state,
        error: null,
        loadingProcess: true,
      }
    }
    case ORDER_ERROR: {
      return {
        ...state,
        error: action.payload,
        loadingProcess: false,
      }
    }
    default:
      return state
  }
}
