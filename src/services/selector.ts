import { createSelector } from '@reduxjs/toolkit'
import { feedOrders } from './feed/selector'
import { profilesOrders } from './profile-orders/selector'
import { orderFromServers } from './order-data/selector'

export const orderSearchSelector = (orderId: number) => {
  return createSelector(
    [feedOrders, profilesOrders, orderFromServers],

    (feedOrders, profilesOrders, orderFromServers) => {
      const foundFeedOrder = feedOrders.find((item) => item.number === orderId)
      const foundProfileOrder = profilesOrders.find(
        (item) => item.number === orderId
      )

      if (foundFeedOrder) {
        return foundFeedOrder
      }

      if (foundProfileOrder) {
        return foundProfileOrder
      }

      return orderFromServers
    }
  )
}
