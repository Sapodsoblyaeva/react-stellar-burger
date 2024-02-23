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
