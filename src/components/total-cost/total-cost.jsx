import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-cost.module.css'
import PropTypes from 'prop-types'

export const TotalCost = ({ arr }) => {
  const orderCost = arr.map((item) => {
    const arrBuns = arr.filter((item) => item.type === 'bun')
    return arrBuns.length === 2
      ? item.price
      : item.type === 'bun'
      ? item.price * 2
      : +item.price
  })

  const initialValue = 0
  const totalCost = orderCost.reduce(
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
      <CurrencyIcon className={styles.total__priceIcon} type='primary' />
    </div>
  )
}

TotalCost.propTypes = {
  arr: PropTypes.array,
}
