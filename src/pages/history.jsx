import { useEffect, useState } from 'react'
import { FeedBlock } from '../components/feed-block/feed-block'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../services/profile-orders/action'
import { wsUrlProfile } from '../utils/constants'
import { profilesOrderSelector } from '../services/profile-orders/selector'
import { feedSelector } from '../services/feed/selector'

export const History = () => {
  const dispatch = useDispatch()
  const accessToken = localStorage
    .getItem('accessToken')
    .split(' ')
    .slice(1)
    .join()

  useEffect(() => {
    dispatch(connect(`${wsUrlProfile}?token=${accessToken}`))
  }, [])

  const { ordersProfile, ordersLoading } = useSelector(
    (store) => store.profileOrder
  )

  return <FeedBlock orders={ordersProfile} />
}
