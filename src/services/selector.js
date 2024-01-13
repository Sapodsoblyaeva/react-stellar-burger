import { createSelector } from '@reduxjs/toolkit'
import { feedOrders } from './feed/selector'
import { profilesOrders } from './profile-orders/selector'
import { orderFromServers } from './order-data/selector'

export const orderSearchSelector = (orderId) => {
  return createSelector(
    [feedOrders, profilesOrders, orderFromServers],

    (feedOrders, profilesOrders, orderFromServers) => {
      return feedOrders.find((item) => item.number === orderId) !== undefined
        ? feedOrders.find((item) => item.number === orderId)
        : profilesOrders.find((item) => item.number === orderId) !== undefined
        ? profilesOrders.find((item) => item.number === orderId)
        : orderFromServers
    }
  )
}
