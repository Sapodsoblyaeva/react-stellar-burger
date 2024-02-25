import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../utils/websocket'
import { OrderFromServerInfo, ProfileOrdersFromServer } from '../../utils/types'

export type FeedOrderState = {
  connectingError: string
  orders: OrderFromServerInfo[]
  ordersQnty: ProfileOrdersFromServer
  ordersLoading: boolean
  url: string
  status: string
}

export type FeedOrdersQnty = Omit<
  ProfileOrdersFromServer,
  'success, total, totalToday'
> &
  OrderFromServerInfo

const initialState: FeedOrderState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: '',
  ordersQnty: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  ordersLoading: true,
  url: '',
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedWsOpen(state) {
      state.status = WebsocketStatus.ONLINE
      state.connectingError = ''
    },
    feedWsClose(state) {
      state.status = WebsocketStatus.OFFLINE
    },
    feedWsError(state, action: PayloadAction<string>) {
      state.connectingError = action.payload
      state.ordersLoading = false
    },
    feedWsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING
      state.ordersLoading = true
    },
    feedWsMessage(state, action: PayloadAction<FeedOrdersQnty>) {
      state.orders = action.payload.orders
      state.ordersQnty = action.payload
      state.ordersLoading = false
    },
    feedConnect(state, action: PayloadAction<string>) {
      state.url = action.payload
    },
  },
})

export const {
  feedWsOpen,
  feedWsClose,
  feedWsError,
  feedWsConnecting,
  feedWsMessage,
  feedConnect,
} = feedSlice.actions

export default feedSlice.reducer
