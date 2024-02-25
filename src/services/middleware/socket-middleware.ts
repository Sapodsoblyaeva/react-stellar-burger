import { Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../../utils/api'
import { Actions } from '../../utils/types';
import { AppDispatch } from '../../hooks/useDispatch';
import { AppState } from '../store';

export const socketMiddleware = (wsActions: Actions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, AppState>) => {
    let socket: WebSocket | null = null
    let closing = false
    let url: string

    return (next) => (action) => {
      url = action.payload
      const { dispatch } = store
      const { type } = action
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload)
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen())
        }

        socket.onerror = () => {
          dispatch(onError('Error'))
        }

        socket.onmessage = (event) => {
          const { data } = event
          console.log(JSON.parse(data))
          const parsedData = JSON.parse(data)
          if (data?.message === 'Invalid or missing token') {
            refreshToken().then((res) =>
              dispatch(wsConnect(url))
            )
          }
          dispatch(onMessage(parsedData))
        }

        socket.onclose = () => {
          if (closing) {
            dispatch(onClose())
          } else {
            dispatch(wsConnect(url))
          }
        }

        if (type === wsDisconnect.type) {
          closing = true
          socket.close()
          socket = null
        }
      }

      next(action)
    }
  }
}
