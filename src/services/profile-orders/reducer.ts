import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../utils/websocket'
import { OrderFromServerInfo, ProfileOrdersFromServer } from '../../utils/types'

export type ProfileOrderInitialState = {
  status: string
  ordersProfile: Array<OrderFromServerInfo>
  connectingError: string
  ordersQnty: ProfileOrdersFromServer
  profileOrdersLoading: boolean
  url: string
}

const initialState: ProfileOrderInitialState = {
  status: WebsocketStatus.OFFLINE,
  ordersProfile: [],
  connectingError: '',
  ordersQnty: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  profileOrdersLoading: true,
  url: '',
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    profileOrdersWsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING
      state.profileOrdersLoading = true
    },
    profileOrdersWsOpen(state) {
      state.status = WebsocketStatus.ONLINE
      state.connectingError = ''
    },
    profileOrdersWsClose(state) {
      state.status = WebsocketStatus.OFFLINE
    },
    profileOrdersWsError(state, action: PayloadAction<string>) {
      state.connectingError = action.payload
      state.profileOrdersLoading = false
    },
    profileOrdersWsMessage(
      state,
      action: PayloadAction<ProfileOrdersFromServer>
    ) {
      state.ordersProfile = action.payload.orders
      state.ordersQnty = action.payload
      state.profileOrdersLoading = false
    },
    profileOrdersConnect(state, action: PayloadAction<string>) {
      state.url = action.payload
    },
  },
})

export const {
  profileOrdersWsConnecting,
  profileOrdersWsOpen,
  profileOrdersWsClose,
  profileOrdersWsError,
  profileOrdersWsMessage,
  profileOrdersConnect,
} = profileOrdersSlice.actions

export default profileOrdersSlice.reducer
