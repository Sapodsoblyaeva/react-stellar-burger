import styles from './feed-statistics.module.css'
import Title from '../title/title'
import { useSelector } from 'react-redux'
import { feedSelector } from '../../services/feed/selector'

export const FeedStatistics = () => {
  const { orders, ordersQnty } = useSelector(feedSelector)

  const doneOrders = orders
    .filter((item) => item.status === 'done')
    .slice(0, 20)
  const ordersInProgress = orders
    .filter((item) => item.status !== 'done')
    .slice(0, 20)

  const ordersReady = doneOrders.map((item, index) => (
    <li
      className={`${'text text_type_digits-default'} ${
        styles.feedStatistics__orderNumber
      }`}
      key={index}
    >
      {item.number}
    </li>
  ))

  const ordersNotReady = ordersInProgress.map((item, index) => (
    <li className='text text_type_digits-default' key={index}>
      {item.number}
    </li>
  ))

  return (
    <div className={styles.feedStatistics}>
      <div className={styles.feedStatistics__table}>
        <div className={styles.feedStatistics__status}>
          <Title title='Готовы:' type='h2' />
          <ul className={styles.feedStatistics__orderNumbers}>{ordersReady}</ul>
        </div>
        <div className={styles.feedStatistics__status}>
          <Title title='В работе:' type='h2' />
          <ul className={styles.feedStatistics__orderNumbers}>
            {ordersNotReady}
          </ul>
        </div>
      </div>
      <div className={styles.feedStatistics__ordersQnty}>
        <Title title='Выполнено за все время:' type='h2' />
        <p className={'text text_type_digits-large'}>{ordersQnty.total}</p>
      </div>
      <div className={styles.feedStatistics__ordersQnty}>
        <Title title='Выполнено за сегодня:' type='h2' />
        <p className={'text text_type_digits-large'}>{ordersQnty.totalToday}</p>
      </div>
    </div>
  )
}
