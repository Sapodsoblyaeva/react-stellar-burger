import { WebsocketStatus } from '../../utils/websocket'

import {
  PROFILE_ORDERS_WS_CLOSE,
  PROFILE_ORDERS_WS_CONNECTING,
  PROFILE_ORDERS_WS_ERROR,
  PROFILE_ORDERS_WS_MESSAGE,
  PROFILE_ORDERS_WS_OPEN,
} from './action'

const initialState = {
  status: WebsocketStatus.OFFLINE,
  ordersProfile: [],
  connectingError: '',
  ordersQnty: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        ordersLoading: true,
      }
    case PROFILE_ORDERS_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: '',
      }
    case PROFILE_ORDERS_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      }
    case PROFILE_ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
        ordersLoading: false,
      }
    case PROFILE_ORDERS_WS_MESSAGE:
      return {
        ...state,
        ordersProfile: action.payload.orders,
        ordersQnty: action.payload,
        ordersLoading: false,
      }
    default:
      return state
  }
}
