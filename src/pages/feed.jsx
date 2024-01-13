import { useDispatch, useSelector } from 'react-redux'
import { FeedBlock } from '../components/feed-block/feed-block'
import { FeedStatistics } from '../components/feed-statistics/feed-statistics'
import Title from '../components/title/title'
import styles from './feed.module.css'
import { feedSelector } from '../services/feed/selector'
import { useEffect } from 'react'
import { WS_URL_FEED } from '../utils/constants'
import { connect, disconnect } from '../services/feed/action'

export const Feed = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connect(WS_URL_FEED))

    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])

  const { orders } = useSelector(feedSelector)

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
