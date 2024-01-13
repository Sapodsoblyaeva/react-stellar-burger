import { useEffect } from 'react'
import { FeedBlock } from '../components/feed-block/feed-block'
import { useDispatch, useSelector } from 'react-redux'
import { connect, disconnect } from '../services/profile-orders/action'
import { WS_URL_PROFILE, wsUrlProfile } from '../utils/constants'
import { profilesOrderSelector } from '../services/profile-orders/selector'

export const History = () => {
  const dispatch = useDispatch()

  const accessToken = localStorage
    .getItem('accessToken')
    .split(' ')
    .slice(1)
    .join()

  useEffect(() => {
    dispatch(connect(`${WS_URL_PROFILE}?token=${accessToken}`))

    return () => {
      dispatch(disconnect())
    }
  }, [dispatch, accessToken])

  const { ordersProfile } = useSelector(profilesOrderSelector)

  return <FeedBlock orders={[...ordersProfile].reverse()} />
}
