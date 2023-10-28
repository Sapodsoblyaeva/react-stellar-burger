import styles from './burger-card.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerCardPropType } from '../../utils/prop-types'

function BurgerCard(props) {
  return (
    <div className={styles.burgercard__subtitleSnacks}>
      <div className={styles.burgercard}>
        <Counter
          count={1}
          size='default'
          extraClass='m-1'
          className={styles.burgercard__counter}
        />
        <img
          className={styles.burgercard__image}
          src={props.img}
          alt={props.text}
        ></img>
        <div className={styles.burgercard__priceBlock}>
          <p className='text text_type_digits-default'>{props.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p
          className={`${'text text_type_main-default'} ${
            styles.burgercard__name
          }`}
        >
          {props.text}
        </p>
      </div>
    </div>
  )
}

export default BurgerCard

BurgerCard.propTypes = {
  props: burgerCardPropType,
}
