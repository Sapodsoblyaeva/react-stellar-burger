import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-item.module.css'
import Title from '../title/title'
import { Link, useLocation } from 'react-router-dom'
import { allIngredients } from '../../services/ingredients/selector'
import { TotalCost } from '../total-cost/total-cost'
import { BriefOrderView } from '../brief-order-view/brief-order-view'
import { BurgerIngredientsType, OrderFromServerInfo } from '../../utils/types'
import { useAppSelector } from '../../hooks/useSelector'
import { IngredientID } from '../order-data/order-data'

type Props = {
  data: OrderFromServerInfo
}

export const FeedItem = ({ data }: Props) => {
  const dateFromServer = data.createdAt

  const location = useLocation()

  const id = data.number

  const { ingredients } = useAppSelector(allIngredients)

  let orderIngredients: BurgerIngredientsType[] = []

  let i: BurgerIngredientsType

  data.ingredients.map((x) => {
    ingredients.map((i) => {
      if (i._id === x) {
        return orderIngredients.push(i)
      }
      return 0
    })
  })

  const visibleSet = new Set(orderIngredients)

  const uniqueVisibleIngredients = Array.from(new Set(orderIngredients)).slice(
    0,
    5
  )

  const contentVisible = uniqueVisibleIngredients.map((ingredient, index) => (
    <BriefOrderView data={ingredient} index={index} key={index} />
  ))

  const uniqueInVisibleIngredients = Array.from(visibleSet).slice(5, 6)

  const invisibleIngredientsQnty =
    orderIngredients.length - uniqueVisibleIngredients.length

  const restOfTheContent = uniqueInVisibleIngredients.map(
    (ingredient, index) => (
      <BriefOrderView
        data={ingredient}
        key={index}
        type='feedItem'
        qnty={invisibleIngredientsQnty}
      />
    )
  )

  return (
    <Link
      key={id}
      to={`${location.pathname}/${id}`}
      state={{ background: location }}
      className={`${styles.feedItem__link} ${'text text_type_digits-default'}`}
    >
      <div className={styles.feedItem}>
        <div className={styles.feedItem__header}>
          <p className='text text_type_digits-default'>{data.number}</p>
          <FormattedDate
            date={new Date(dateFromServer)}
            className={`${'text text_type_main-small text_color_inactive'} ${
              styles.feedItem__date
            }`}
          />
        </div>
        <Title title={data.name} type='h2' />
        {location.pathname === '/profile/orders' && (
          <Title
            title={
              data.status === 'done'
                ? 'Выполнен'
                : data.status === 'pending'
                ? 'Отменен'
                : 'Готовится'
            }
            type='h4'
            style={
              data.status === 'created'
                ? styles.feedItem__caption_active
                : styles.feedItem__caption
            }
          />
        )}
        <div className={styles.feedItem__briefOrder}>
          <div className={styles.feedItem__images}>
            {contentVisible}
            {restOfTheContent}
          </div>
          <TotalCost arr={orderIngredients} />
        </div>
      </div>
    </Link>
  )
}
