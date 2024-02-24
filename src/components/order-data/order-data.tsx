import Title from '../title/title'
import styles from './order-data.module.css'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { feedSelector } from '../../services/feed/selector'
import { useLocation, useParams } from 'react-router-dom'
import { allIngredients } from '../../services/ingredients/selector'
import { TotalCost } from '../total-cost/total-cost'
import { BriefOrderView } from '../brief-order-view/brief-order-view'
import { findOrder } from '../../services/order-data/action'
import { order as OrderSelector } from '../../services/order-data/selector'
import { ReactNode, useEffect } from 'react'
import { orderSearchSelector } from '../../services/selector'
import { BurgerIngredientsType, Ingredient } from '../../utils/types'
import { useAppDispatch } from '../../hooks/useDispatch'
import { useAppSelector } from '../../hooks/useSelector'
import { profilesOrderSelector } from '../../services/profile-orders/selector'

export type IngredientID = {
  [key: string]: number
}

export const OrderData = () => {
  const location = useLocation()

  const orderNumber = location.pathname.split('/').slice(-1).join()

  const dispatch = useAppDispatch()

  const order = useAppSelector(orderSearchSelector(parseInt(orderNumber)))

  const { ordersLoading } = useAppSelector(feedSelector)
  const { ingredients } = useAppSelector(allIngredients)

  const { loading } = useAppSelector(OrderSelector)

  const { profileOrdersLoading } = useAppSelector(profilesOrderSelector)

  useEffect(() => {
    if (order) {
      dispatch(findOrder(parseInt(orderNumber)))
      if (!loading) {
      }
    }
  }, [dispatch])

  if (loading && ordersLoading && profileOrdersLoading) {
    return <h2>Loading...</h2>
  }

  const dateFromServer = order.createdAt

  let orderIngredients: BurgerIngredientsType[] = []

  let i: BurgerIngredientsType

  order.ingredients.map((x) => {
    ingredients.map((i) => {
      if (i._id === x) {
        return orderIngredients.push(i)
      }
      return 0
    })
  })

  const uniqueIngredients = Array.from(new Set(orderIngredients))

  console.log(uniqueIngredients)

  let arr: Array<string> = []

  orderIngredients.forEach((item) => arr.push(item._id))

  const ingredientsIds = arr.reduce(function (
    accumulator: IngredientID,
    currentValue
  ) {
    if (accumulator.hasOwnProperty(currentValue!)) {
      accumulator[currentValue!] += 1
    } else {
      accumulator[currentValue!] = 1
    }
    return accumulator
  },
  {})

  const ingredientsIdsArr: Array<[string, number]> =
    Object.entries(ingredientsIds)

  const ingredientsQnty = (ingredient: BurgerIngredientsType) => {
    if (ingredient.type === 'bun') {
      return 2
    } else {
      const itemPriceArr = ingredientsIdsArr.find(
        (item) => item[0] === ingredient._id
      )
      if (itemPriceArr) {
        return itemPriceArr[1]
      }
    }
    return 0
  }

  const ingredientPrice = (ingredient: Ingredient) => {
    const ingredientPrice = uniqueIngredients.find(
      (item) => item._id === ingredient._id
    )
    if (ingredientPrice) {
      return ingredientPrice.price
    } else {
      return 0
    }
  }

  const content: ReactNode = Array.from(uniqueIngredients).map(
    (ingredient, index) => (
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
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    )
  )

  return (
    <section className={styles.orderData}>
      <p
        className={`${
          styles.orderData__number
        } ${'text text_type_digits-medium'}`}
      >
        {orderNumber}
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
