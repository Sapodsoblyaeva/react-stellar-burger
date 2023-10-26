import styles from './cart.module.css'
import MenuItem from '../menuItem/menuItem'
import { data } from "../../utils/data"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

function Cart() {
  return (
    <div className={styles.cartMenu}>
    <div className={`${'custom-scroll'} ${styles.cart}`}>
      <MenuItem text={data[0].name} thumbnail={data[0].image} price={data[0].price} type="top"
        isLocked={true}/>
      <MenuItem text={data[1].name} thumbnail={data[1].image} price={data[1].price}/>
      <MenuItem text={data[2].name} thumbnail={data[2].image} price={data[2].price}/>
      <MenuItem text={data[3].name} thumbnail={data[3].image} price={data[3].price}/>
      <MenuItem text={data[4].name} thumbnail={data[4].image} price={data[4].price}/>
      <MenuItem text={data[5].name} thumbnail={data[5].image} price={data[5].price}/>
      <MenuItem text={data[6].name} thumbnail={data[6].image} price={data[6].price}/>
      <MenuItem text={data[0].name} thumbnail={data[0].image} price={data[0].price} type="bottom"
        isLocked={true}/>
    </div>
    <div className={styles.cart__totalPrice}>
        <div className={styles.cart__cost}>
    <p className={`${styles.cart__priceText} ${"text text_type_digits-medium"}`}>610</p>
    <CurrencyIcon className={styles.cart__priceIcon} type='primary'/>
    </div>
    <Button htmlType="button" type="primary" size="medium">
  Оформить заказ
</Button>
</div>
    </div>
  )
}

export default Cart
