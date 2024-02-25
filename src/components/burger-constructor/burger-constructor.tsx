import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useModal } from '../../hooks/useModal'
import { useEffect, useState } from 'react'
import { constructorComponents } from '../../services/constructor-ingredients/selector'
import { loadOrder } from '../../services/order-data/action'
import { useNavigate } from 'react-router-dom'
import { BurgerIngredientsType, ItemType } from '../../utils/types'
import { useAppSelector } from '../../hooks/useSelector'
import { useAppDispatch } from '../../hooks/useDispatch'

type Props = {
  onDropHandler(item: BurgerIngredientsType): void
}

const BurgerConstructor = ({ onDropHandler }: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [button, setButton] = useState<boolean>(true)

  const { isModalOpen, openModal, closeModal } = useModal()

  const { comp } = useAppSelector(constructorComponents)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const orderNumberFromApi = () => {
    if (localStorage.getItem('refreshToken')) {
      let arr: Array<string> = []
      let bunComponent: string = ''
      comp.length !== 0 &&
        comp.map((component: ItemType) => {
          if (component.data !== undefined && component.data.type !== 'bun') {
            arr.push(component.data._id)
          } else if (
            component.data !== undefined &&
            component.data.type === 'bun'
          ) {
            arr.unshift(component.data._id)
            bunComponent = component.data._id
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
    let total: number = 0
    comp.length !== 0 &&
      comp.map(
        (component: ItemType) =>
          component.data !== undefined &&
          (total +=
            component.data.type === 'bun'
              ? component.data.price * 2
              : component.data.price)
      )
    setTotalPrice(total)
  }, [comp, setTotalPrice])

  useEffect(() => {
    comp.length !== 0 &&
      comp.map(
        (component: ItemType) =>
          component.data !== undefined &&
          component.data.type === 'bun' &&
          setButton(false)
      )
  }, [comp, setButton])

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
          <CurrencyIcon type='primary' />
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

export default BurgerConstructor
