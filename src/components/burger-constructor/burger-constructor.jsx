import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useModal } from '../../hooks/useModal'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constructorIngredients } from '../../services/constructor-ingredients/selector'
import { loadOrder } from '../../services/order-data/action'
import { useNavigate } from 'react-router-dom'

export default function BurgerConstructor({ onDropHandler }) {
  const [totalPrice, setTotalPrice] = useState(0)
  const [button, setButton] = useState(true)

  const { isModalOpen, openModal, closeModal } = useModal()

  const { components } = useSelector(constructorIngredients)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const orderNumberFromApi = () => {
    if (localStorage.getItem('refreshToken')) {
      let arr = []
      let bunComponent = ''
      components.length !== 0 &&
        components.map((component) => {
          if (component.item.type !== 'bun') {
            arr.push(component.item._id)
          } else if (component.item.type === 'bun') {
            arr.unshift(component.item._id)
            bunComponent = component.item._id
          }
        })
      arr.push(bunComponent)
      dispatch(loadOrder(arr))
      openModal()
      setButton(true)
    } else {
      navigate('/login')
    }
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

  useEffect(() => {
    components.length !== 0 &&
      components.map(
        (component) => component.item.type === 'bun' && setButton(false)
      )
  }, [components, setButton])

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
            disabled={button}
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
