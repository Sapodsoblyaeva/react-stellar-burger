import { WebsocketStatus } from '../../utils/websocket'

import {
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN,
} from './action'

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: '',
  ordersQnty: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        ordersLoading: false,
      }
    case FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: '',
        ordersLoading: false,
      }
    case FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        ordersLoading: false,
      }
    case FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
        ordersLoading: false,
      }
    case FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        ordersQnty: action.payload,
        ordersLoading: true,
      }
    default:
      return state
  }
}
