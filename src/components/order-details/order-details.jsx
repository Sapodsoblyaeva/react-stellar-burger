import styles from './order-details.module.css'
import Title from '../title/title'
import done from '../../images/done.png'
import { useSelector } from 'react-redux'
import { order } from '../../services/order-data/selectors'

export default function OrderDetails(props) {
  const { orderNumber } = useSelector(order)

  return (
    <div className={styles.order}>
      <Title style={styles.order__title} title={orderNumber} type='h2_digits' />
      <p className='text text_type_main-large'>идентификатор заказа</p>
      <img
        className={styles.order__image}
        src={done}
        alt='Значок - Заказ сделан'
      ></img>
      <p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
      <p
        className={`${'text text_type_main-medium text_color_inactive'} ${
          styles.order__caption
        }`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
