import styles from './burger-constructor.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorRenderer from '../constructor-renderer/constructor-renderer'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useModal } from '../../hooks/useModal'
import PropTypes from 'prop-types'
import { ingredientsPropType } from '../../utils/prop-types'

export default function BurgerConstructor({ ingredients }) {
  const { isModalOpen, openModal, closeModal } = useModal()

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
            onClick={openModal}
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
