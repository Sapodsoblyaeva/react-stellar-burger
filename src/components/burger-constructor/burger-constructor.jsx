import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'

import { useState, useEffect } from 'react'

export const apiIngredients =
  'https://norma.nomoreparties.space/api/ingredients'

function BurgerConstructor() {
  const [ingredients, setIngredients] = useState([])

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
        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
