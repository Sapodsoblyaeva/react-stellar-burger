import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import Title from '../title/title'
import FillRenderer from '../fill-renderer/fill-renderer'
import { ingredientsPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredients-details/ingredients-details'
import { useModal } from '../../hooks/useModal'
import { useState } from 'react'

export default function BurgerIngredients({ ingredients }) {
  const { isModalOpen, openModal, closeModal } = useModal()

  const [values, setValues] = useState({})

  return (
    <section className={styles.burgeringredients}>
      <Title
        type='h1'
        style={styles.burgeringredients__title}
        title='Соберите Бургер'
      />
      <FillMenu />
      <div className={`${'custom-scroll'} ${styles.burgeringredients__menu}`}>
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Булки'
        />
        <FillRenderer
          data={ingredients}
          setValues={setValues}
          openPopup={openModal}
          part='bun'
        />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Соусы'
        />
        <FillRenderer
          data={ingredients}
          setValues={setValues}
          openPopup={openModal}
          part='sauce'
        />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Начинка'
        />
        <FillRenderer
          data={ingredients}
          setValues={setValues}
          openPopup={openModal}
          part='main'
        />
      </div>
      {isModalOpen && (
        <Modal closePopup={closeModal}>
          <IngredientsDetails data={values} />
        </Modal>
      )}
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType),
}
