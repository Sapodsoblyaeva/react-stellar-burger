import Title from '../title/title'
import styles from './order-data.module.css'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { feedSelector } from '../../services/feed/selector'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { allIngredients } from '../../services/ingredients/selectors'
import { TotalCost } from '../total-cost/total-cost'
import { BriefOrderView } from '../brief-order-view/brief-order-view'
import { findOrder } from '../../services/order-data/action'
import { useEffect } from 'react'

export const OrderData = () => {

  const orderId = useParams().id

  const dispatch = useDispatch()

  const order = useSelector((store) => {
    let order = store.feed.orders.find(
      (item) => item.number === parseInt(orderId)
    )
    if (order) {
      return order
    }

    order = store.profileOrder.ordersProfile.find(
      (item) => item.number === parseInt(orderId)
    )
    if (order) {
      return order
    }

    return store.orderNumber.orderFromServer
  })

  useEffect(() => {
    if (!order) {
      dispatch(findOrder(parseInt(orderId)))
    }
  }, [])

  const { ordersLoading } = useSelector(feedSelector)

  const { ingredients } = useSelector(allIngredients)

  if (ordersLoading !== true) {
    return <h2>Loading...</h2>
  }

  const dateFromServer = order.createdAt
  const orderIngredients = order.ingredients.map(
    (ingredient) =>
      ingredient !== null && ingredients.find((item) => item._id === ingredient)
  )

  const uniqueIngredients = new Set(
    orderIngredients.filter((item) => item !== false)
  )

  let arr = []
  orderIngredients
    .filter((item) => item !== false)
    .map((ingredient) => {
      arr.push(ingredient._id)
    })

  const ingredientsIds = arr.reduce((accumulator, currentValue) => {
    if (accumulator.hasOwnProperty(currentValue)) {
      accumulator[currentValue] += 1
    } else {
      accumulator[currentValue] = 1
    }
    return accumulator
  }, {})

  const ingredientsQnty = (ingredient) => {
    return ingredient.type === 'bun'
      ? 2
      : Object.entries(ingredientsIds).find(
          (item) => item[0] === ingredient._id
        )[1]
  }

  const ingredientPrice = (ingredient) => {
    return Array.from(uniqueIngredients).find(
      (item) => item._id === ingredient._id
    ).price
  }

  const content = Array.from(uniqueIngredients).map((ingredient, index) => (
    <div key={index}>
      <div className={styles.orderData__item}>
        <BriefOrderView data={ingredient} />
        <Title
          title={ingredient.name}
          type='h4'
          style={styles.orderData__orderPosition}
        />
        <div className={styles.orderData__cost}>
          <p
            className={`${
              styles.orderData__priceText
            } ${'text text_type_digits-default'}`}
          >
            {`${ingredientsQnty(ingredient)}${'x'}${ingredientPrice(
              ingredient
            )}`}
          </p>
          <CurrencyIcon
            className={styles.orderData__priceIcon}
            type='primary'
          />
        </div>
      </div>
    </div>
  ))

  return (
    <section className={styles.orderData}>
      <p
        className={`${
          styles.orderData__number
        } ${'text text_type_digits-medium'}`}
      >
        {orderId}
      </p>
      <Title title={order.name} type='h2' style={styles.orderData__title} />
      <Title
        title={order.status === 'done' ? 'Выполнен' : 'Готовится'}
        type='h4'
        style={styles.orderData__caption}
      />
      <Title title='Состав:' type='h2' style={styles.orderData__subtitle} />
      <div className={`${styles.orderData__order} ${'custom-scroll'}`}>
        {content}
      </div>
      <div className={styles.orderData__footer}>
        <FormattedDate
          date={new Date(dateFromServer)}
          className={`${'text text_type_main-small text_color_inactive'} ${
            styles.orderData__date
          }`}
        />
        <TotalCost arr={orderIngredients} />
      </div>
    </section>
  )
}
