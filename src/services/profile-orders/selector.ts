import { AppState } from '../store'

export const profilesOrderSelector = (store: AppState) => store.profileOrder
export const profilesOrders = (store: AppState) =>
  store.profileOrder.ordersProfile
