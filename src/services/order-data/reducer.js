import {
  ORDER_ERROR,
  ORDER_PROGRESS,
  ORDER_SEARCH_SUCCESS,
  ORDER_SUCCESS,
} from './action'

const initialState = {
  orderNumber: 0,
  orderFromServer: [],
  loading: true,
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
    case ORDER_SEARCH_SUCCESS: {
      return {
        ...state,
        orderFromServer: action.payload,
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
