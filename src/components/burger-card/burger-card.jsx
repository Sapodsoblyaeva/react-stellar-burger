import styles from './burger-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredients-details/ingredients-details'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function BurgerCard({
  img,
  text,
  price,
  calories,
  fat,
  proteins,
  carbohydrates,
}) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div
      className={styles.burgercard__subtitleSnacks}
      onClick={() => setIsOpened(false)}
    >
      <div
        className={styles.burgercard}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpened(true)
        }}
      >
        <Counter
          count={1}
          size='default'
          extraClass='m-1'
          className={styles.burgercard__counter}
        />
        <img className={styles.burgercard__image} src={img} alt={text}></img>
        <div className={styles.burgercard__priceBlock}>
          <p className='text text_type_digits-default'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p
          className={`${'text text_type_main-default'} ${
            styles.burgercard__name
          }`}
        >
          {text}
        </p>
      </div>
      {isOpened && (
        <Modal setIsOpened={setIsOpened}>
          <IngredientsDetails
            name={text}
            img={img}
            calories={calories}
            fat={fat}
            proteins={proteins}
            carbohydrates={carbohydrates}
          />
        </Modal>
      )}
    </div>
  )
}

BurgerCard.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  calories: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  carbohydrades: PropTypes.number,
}
