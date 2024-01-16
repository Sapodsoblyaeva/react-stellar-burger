import { FeedItem } from '../feed-item/feed-item'
import styles from './feed-block.module.css'
import PropTypes from 'prop-types'

export const FeedBlock = ({ orders }) => {
  return (
    <div className={`${styles.feedBlock} ${'custom-scroll'}`}>
      {orders.map((order, index) => (
        <FeedItem data={order} key={index} />
      ))}
    </div>
  )
}

FeedBlock.propTypes = {
  orders: PropTypes.array,
}
