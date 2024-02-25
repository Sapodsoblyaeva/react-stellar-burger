import { OrderFromServerInfo } from '../../utils/types'
import { FeedItem } from '../feed-item/feed-item'
import styles from './feed-block.module.css'

type Props = {
  orders: OrderFromServerInfo[]
}

export const FeedBlock = ({ orders }: Props) => {
  return (
    <div className={`${styles.feedBlock} ${'custom-scroll'}`}>
      {orders.map((order, index) => (
        <FeedItem data={order} key={index} />
      ))}
    </div>
  )
}
