export type Websocket = {
  CONNECTING: string
  ONLINE: string
  OFFLINE: string
}

export const WebsocketStatus: Websocket = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
}
