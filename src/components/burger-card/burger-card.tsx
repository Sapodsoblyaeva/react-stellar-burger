import styles from './burger-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getIngredientCard } from '../../services/ingredient-сard/reducer'
import { useDrag } from 'react-dnd'
import { constructorComponents } from '../../services/constructor-ingredients/selector'
import { Link, useLocation } from 'react-router-dom'
import { BurgerIngredientsType } from '../../utils/types'
import { useAppDispatch } from '../../hooks/useDispatch'
import { useAppSelector } from '../../hooks/useSelector'

type Props = {
  data: BurgerIngredientsType
  openPopup: () => {}
}

export const BurgerCard = ({ data, openPopup }: Props) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: data,
  })

  const { comp } = useAppSelector(constructorComponents)

  let orderedIngredients: Array<string> = []

  comp.filter((el) => orderedIngredients.push(el.data._id))

  const id = data._id

  return (
    <Link
      key={id}
      to={`/ingredients/${id}`}
      state={{ background: location, card: data }}
      className={`${styles.link} ${'text text_type_digits-default'}`}
    >
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
    </Link>
  )
}

export default BurgerCard
