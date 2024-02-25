import { AppState } from '../store'

export const feedSelector = (store: AppState) => store.feed
export const feedOrders = (store: AppState) => store.feed.orders
