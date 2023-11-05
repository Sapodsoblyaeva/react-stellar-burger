import styles from './burger-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function BurgerCard({ data, setValues, openPopup }) {
  const getValues = () => {
    setValues(data)
  }

  return (
    <div className={styles.burgercard__subtitleSnacks}>
      <div
        className={styles.burgercard}
        onClick={() => {
          openPopup()
          getValues()
        }}
      >
        <Counter
          count={1}
          size='default'
          extraClass='m-1'
          className={styles.burgercard__counter}
        />
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
  setValues: PropTypes.func,
  openPopup: PropTypes.func,
}
