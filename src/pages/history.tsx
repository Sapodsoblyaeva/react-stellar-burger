import { useEffect } from 'react'
import { FeedBlock } from '../components/feed-block/feed-block'
import { profileOrdersDisConnect } from '../services/profile-orders/action'
import { WS_URL_PROFILE } from '../utils/constants'
import {
  profilesOrderSelector,
  profilesOrders,
} from '../services/profile-orders/selector'
import { useAppDispatch } from '../hooks/useDispatch'
import { profileOrdersConnect } from '../services/profile-orders/reducer'
import { useAppSelector } from '../hooks/useSelector'

export const History = () => {
  const dispatch = useAppDispatch()

  const token: string | null = localStorage.getItem('accessToken')

  const accessToken = token?.split(' ').slice(1).join()

  useEffect(() => {
    dispatch(profileOrdersConnect(`${WS_URL_PROFILE}?token=${accessToken}`))

    return () => {
      dispatch(profileOrdersDisConnect())
    }
  }, [dispatch, accessToken])

  const { ordersProfile } = useAppSelector(profilesOrderSelector)

  return <FeedBlock orders={[...ordersProfile].reverse()} />
}
