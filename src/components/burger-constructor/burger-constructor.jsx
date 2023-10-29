import styles from './burger-constructor.module.css'
import MenuItem from '../menu-item/menu-item'
import { data } from '../../utils/data'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'

function BurgerConstructor() {
  return (
    <section className={styles.burgerConstructor}>
 <ConstructorRenderer data={data}/>
      <div className={styles.burgerConstructor__totalPrice}>
        <div className={styles.burgerConstructor__cost}>
          <p
            className={`${
              styles.burgerConstructor__priceText
            } ${'text text_type_digits-medium'}`}
          >
            610
          </p>
          <CurrencyIcon
            className={styles.burgerConstructor__priceIcon}
            type='primary'
          />
        </div>
        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
