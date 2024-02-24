import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-cost.module.css'
import { BurgerIngredientsType } from '../../utils/types'
import { useAppSelector } from '../../hooks/useSelector'
import { allIngredients } from '../../services/ingredients/selector'

type Props = {
  arr: BurgerIngredientsType[]
}

export const TotalCost = ({ arr }: Props) => {

  const orderCost: number[] = arr.map((item) => {
    const arrBuns = arr.filter((item) => item!.type === 'bun')
    return arrBuns.length === 2
      ? item.price
      : item.type === 'bun'
      ? item.price * 2
      : +item.price
  })


  const initialValue: number = 0
  const totalCost: number = orderCost.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  )

  return (
    <div className={styles.total__cost}>
      <p
        className={`${
          styles.total__priceText
        } ${'text text_type_digits-default'}`}
      >
        {totalCost}
      </p>
      <CurrencyIcon type='primary' />
    </div>
  )
}
