import styles from './order-details.module.css'
import done from '../../images/done.png'
import { order } from '../../services/order-data/selectors'
import { useSelector } from 'react-redux'

export default function OrderDetails() {
  const { orderNumber, loading, error } = useSelector(order)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!loading && error) {
    return <h2>Something's gone wrong...</h2>
  }

  return (
    <div className={styles.order}>
      <p className={`${styles.order__title} ${"text text_type_digits-large"}`}>{orderNumber}</p>
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
