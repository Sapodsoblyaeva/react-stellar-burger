import { FeedBlock } from '../components/feed-block/feed-block'
import { FeedStatistics } from '../components/feed-statistics/feed-statistics'
import Title from '../components/title/title'
import styles from './feed.module.css'
import { feedSelector } from '../services/feed/selector'
import { useEffect } from 'react'
import { WS_URL_FEED } from '../utils/constants'
import { feedDisConnect } from '../services/feed/action'
import { useAppDispatch } from '../hooks/useDispatch'
import { feedConnect } from '../services/feed/reducer'
import { useAppSelector } from '../hooks/useSelector'

export const Feed = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(feedConnect(WS_URL_FEED))

    return () => {
      dispatch(feedDisConnect())
    }
  }, [dispatch])

  const { orders } = useAppSelector(feedSelector)

  return (
    <section className={styles.feed}>
      <Title title='Лента Заказов' type='h1' style={styles.feed__title} />
      <div className={styles.feed__container}>
        <FeedBlock orders={orders} />
        <FeedStatistics />
      </div>
    </section>
  )
}
