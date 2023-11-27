import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useModal } from '../../hooks/useModal'
import PropTypes from 'prop-types'
import { TotalPriceContext } from '../../services/app-context'
import { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constructorIngredients } from '../../services/constructor-ingredients/selectors'
import { loadOrder } from '../../services/order-data/action'
import { order } from '../../services/order-data/selectors'

export default function BurgerConstructor({ onDropHandler }) {
  const { isModalOpen, openModal, closeModal } = useModal()

  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext)

  const { components } = useSelector(constructorIngredients)

  const dispatch = useDispatch()

  const { loading } = useSelector(order)

  const openPopup = useCallback(() => {
    openModal()
  }, [loading])

  const orderNumberFromApi = () => {
    let arr = []
    components.length !== 0 &&
      components.map((component) => {
        arr.push(component.item._id)
      })
    dispatch(loadOrder(arr))
    openPopup()
  }

  useEffect(() => {
    let total = 0
    components.length !== 0 &&
      components.map(
        (component) =>
          (total +=
            component.item.type === 'bun'
              ? component.item.price * 2
              : component.item.price)
      )
    setTotalPrice(total)
  }, [components, setTotalPrice])

  return (
    <section className={styles.burgerConstructor}>
      <ConstructorRenderer onDropHandler={onDropHandler} />
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
              orderNumberFromApi()
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
  onDropHandler: PropTypes.func,
}
