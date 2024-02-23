import { AppState } from '../store'

export const order = (store: AppState) => store.orderNumber
export const orderFromServers = (store: AppState) =>
  store.orderNumber.orderFromServer
