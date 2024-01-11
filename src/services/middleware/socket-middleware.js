import { refreshToken } from '../../utils/api'

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null
    let closing = false
    let url

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

      if (type === wsConnect) {
        socket = new WebSocket(action.payload)
        dispatch({ type: wsConnecting })
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen })
        }

        socket.onerror = () => {
          dispatch({ type: onError, payload: 'Error' })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          if (data?.message === 'Invalid or missing token') {
            refreshToken().then((res) =>
              dispatch({ type: wsConnect, payload: url })
            )
          }
          dispatch({ type: onMessage, payload: parsedData })
        }

        socket.onclose = () => {
          if (closing) {
            dispatch({ type: onClose })
          } else {
            dispatch({ type: wsConnect, payload: url })
          }
        }

        if (type === wsDisconnect) {
          closing = true
          socket.close()
          socket = null
        }
      }

      next(action)
    }
  }
}
