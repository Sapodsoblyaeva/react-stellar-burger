import { composeWithDevTools } from 'redux-devtools-extension'
import { customMiddleware } from './middleware/custom-middleware'
import { reducer } from './reducer'
import { applyMiddleware, createStore } from 'redux'
import { socketMiddleware } from './middleware/socket-middleware'
import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN,
} from './feed/action'
import {
  PROFILE_ORDERS_CONNECT,
  PROFILE_ORDERS_DISCONNECT,
  PROFILE_ORDERS_WS_CLOSE,
  PROFILE_ORDERS_WS_CONNECTING,
  PROFILE_ORDERS_WS_ERROR,
  PROFILE_ORDERS_WS_MESSAGE,
  PROFILE_ORDERS_WS_OPEN,
} from './profile-orders/action'

const middleWare = customMiddleware()
const websocketMiddleWareOrders = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE,
})

const websocketMiddleWareProfile = socketMiddleware({
  wsConnect: PROFILE_ORDERS_CONNECT,
  wsDisconnect: PROFILE_ORDERS_DISCONNECT,
  wsConnecting: PROFILE_ORDERS_WS_CONNECTING,
  onOpen: PROFILE_ORDERS_WS_OPEN,
  onClose: PROFILE_ORDERS_WS_CLOSE,
  onError: PROFILE_ORDERS_WS_ERROR,
  onMessage: PROFILE_ORDERS_WS_MESSAGE,
})

export const configureStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(
        middleWare,
        websocketMiddleWareOrders,
        websocketMiddleWareProfile
      )
    )
  )
  return store
}
