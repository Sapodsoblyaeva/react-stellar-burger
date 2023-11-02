import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import { useState, useEffect } from 'react'
import { apiIngredients } from '../../utils/constants'
import OrderDetails from '../order-details/order-details'

export default function BurgerConstructor() {
  const [ingredients, setIngredients] = useState([])
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    const getIngredients = () => {
      fetch(apiIngredients)
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((result) => setIngredients(result.data))
        .catch((error) => console.error(error))
    }
    getIngredients()
  }, [])

  return (
    <section className={styles.burgerConstructor}>
      <ConstructorRenderer data={ingredients} />
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
        <div>
          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={() => setIsOpened(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOpened && (
        <Modal setIsOpened={setIsOpened}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
