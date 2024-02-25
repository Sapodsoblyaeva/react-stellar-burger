import {
  Action,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit'
import { FeedOrdersQnty } from '../services/feed/reducer'

export type ItemID = {
  _id: string
}

export type Ingredient = ItemID & {
  type: string
}

export type BurgerIngredientsType = Ingredient & {
  name: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export type ItemType = {
  data: BurgerIngredientsType
  key: string
}

export type ProfileOrdersFromServer = {
  success: boolean
  orders: Array<OrderFromServerInfo>
  total: number
  totalToday: number
}

export type OrderFromServerInfo = {
  _id: string
  ingredients: Array<string>
  createdAt: string
  name: string
  number: number
  status: string
  updatedAt: string
}

export type User = {
  name: string
  email: string
}

export type UserLogin = Omit<User, 'name'> & {
  pass: string
}

export type UserRegister = User & {
  pass: string
}

export type UserChange = Omit<UserRegister, 'email'>

export type UserResponseFromServer = {
  accessToken: string
  refreshToken: string
  user: User
}

export type ErrorFromApiRequest = {
  message: string
}

export type Actions = {
  wsConnect: ActionCreatorWithPayload<string, string>
  wsDisconnect: ActionCreatorWithoutPayload<string>
  wsConnecting: ActionCreatorWithoutPayload<string>
  onOpen: ActionCreatorWithoutPayload<string>
  onClose: ActionCreatorWithoutPayload<string>
  onError: ActionCreatorWithPayload<string, string>
  onMessage:
    | ActionCreatorWithPayload<ProfileOrdersFromServer, string>
    | ActionCreatorWithPayload<FeedOrdersQnty, string>
}
