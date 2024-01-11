import { useDispatch, useSelector } from 'react-redux'
import { FeedBlock } from '../components/feed-block/feed-block'
import { FeedStatistics } from '../components/feed-statistics/feed-statistics'
import Title from '../components/title/title'
import styles from './feed.module.css'
import { feedSelector } from '../services/feed/selector'
import { useEffect } from 'react'
import { wsUrlFeed } from '../utils/constants'
import { connect } from '../services/feed/action'
import { disconnect } from '../services/feed/action'

export const Feed = () => {
  const { orders } = useSelector(feedSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connect(wsUrlFeed))

    return () => {
      dispatch(disconnect())
    }
  }, [])

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
