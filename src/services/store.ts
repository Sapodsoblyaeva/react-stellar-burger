import { socketMiddleware } from './middleware/socket-middleware'
import { feedDisConnect } from './feed/action'
import { profileOrdersDisConnect } from './profile-orders/action'

import {
  feedWsClose,
  feedWsConnecting,
  feedWsError,
  feedWsMessage,
  feedWsOpen,
  feedConnect,
} from './feed/reducer'
import {
  profileOrdersWsClose,
  profileOrdersWsConnecting,
  profileOrdersWsError,
  profileOrdersWsMessage,
  profileOrdersWsOpen,
  profileOrdersConnect,
} from './profile-orders/reducer'

import IngredientsReducer from './ingredients/reducer'
import UserReducer from './registration/reducer'
import ComponentsReducer from './constructor-ingredients/reducer'
import ingredientCardReducer from './ingredient-сard/reducer'
import orderDataReducer from './order-data/reducer'
import FeedReducer from './feed/reducer'
import profileOrdersReducer from './profile-orders/reducer'
import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit'

const websocketMiddleWareOrders = socketMiddleware({
  wsConnect: feedConnect,
  wsDisconnect: feedDisConnect,
  wsConnecting: feedWsConnecting,
  onOpen: feedWsOpen,
  onClose: feedWsClose,
  onError: feedWsError,
  onMessage: feedWsMessage,
})

const websocketMiddleWareProfile = socketMiddleware({
  wsConnect: profileOrdersConnect,
  wsDisconnect: profileOrdersDisConnect,
  wsConnecting: profileOrdersWsConnecting,
  onOpen: profileOrdersWsOpen,
  onClose: profileOrdersWsClose,
  onError: profileOrdersWsError,
  onMessage: profileOrdersWsMessage,
})

export const store = configureStore({
  reducer: {
    ingredients: IngredientsReducer,
    card: ingredientCardReducer,
    orderNumber: orderDataReducer,
    user: UserReducer,
    feed: FeedReducer,
    profileOrder: profileOrdersReducer,
    comp: ComponentsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      websocketMiddleWareOrders,
      websocketMiddleWareProfile
    )
  },
})

export type AppState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>
