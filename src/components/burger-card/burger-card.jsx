import styles from './burger-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientCard } from '../../services/ingredient-сard/action'
import { useDrag } from 'react-dnd'
import { constructorIngredients } from '../../services/constructor-ingredients/selectors'

export default function BurgerCard({ data, openPopup }) {
  const dispatch = useDispatch()

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: data,
  })

  const { components } = useSelector(constructorIngredients)

  let orderedIngredients = []
  components.filter((el) => orderedIngredients.push(el.item._id))

  return (
    <div className={styles.burgercard__subtitleSnacks}>
      <div
        className={styles.burgercard}
        onClick={() => {
          openPopup()
          dispatch(getIngredientCard(data))
        }}
        ref={dragRef}
      >
        {
          <Counter
            count={
              orderedIngredients.filter(
                (ingredientId) => ingredientId === data._id
              ).length
            }
            size='default'
            extraClass='m-1'
            className={styles.burgercard__counter}
          />
        }
        <img
          className={styles.burgercard__image}
          src={data.image}
          alt={data.name}
        ></img>
        <div className={styles.burgercard__priceBlock}>
          <p className='text text_type_digits-default'>{data.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p
          className={`${'text text_type_main-default'} ${
            styles.burgercard__name
          }`}
        >
          {data.name}
        </p>
      </div>
    </div>
  )
}

BurgerCard.propTypes = {
  data: PropTypes.object,
  openPopup: PropTypes.func,
}
