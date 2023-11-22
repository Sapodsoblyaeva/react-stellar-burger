import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useModal } from '../../hooks/useModal'
import PropTypes from 'prop-types'
import { ingredientsPropType } from '../../utils/prop-types'

import {
  TotalPriceContext,
  AppContext,
  ComponentsContext,
  OrderNumberContext,
} from '../../services/app-context'
import { useContext, useEffect, useMemo } from 'react'

export default function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal()
  const { ingredients } = useContext(AppContext)
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext)

  const { components } = useContext(ComponentsContext)

  const { addNewOrder } = useContext(OrderNumberContext)

  useEffect(() => {
    let total = 0
    components.component.map(
      (item) => (total += item.type === 'bun' ? item.price * 2 : item.price)
    )
    setTotalPrice(total)
  }, [components, setTotalPrice])

  // const getNewOrder = useMemo(() => addNewOrder())

  return (
    <section className={styles.burgerConstructor}>
      <ConstructorRenderer />
      <div className={styles.burgerConstructor__totalPrice}>
        <div className={styles.burgerConstructor__cost}>
          <p
            className={`${
              styles.burgerConstructor__priceText
            } ${'text text_type_digits-medium'}`}
          >
            {totalPrice}
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
            onClick={() => {
              addNewOrder()
              openModal()
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal closePopup={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType),
}
