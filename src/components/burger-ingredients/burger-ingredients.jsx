import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import Title from '../title/title'
import FillRenderer from '../fill-renderer/fill-renderer'
import { ingredientsPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredients-details/ingredients-details'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import { allIngredients } from '../../services/ingredients/selectors'
import { useState } from 'react'
import { ScrollContext } from '../../services/app-context'

export default function BurgerIngredients() {
  const { isModalOpen, openModal, closeModal } = useModal()
  const { ingredients } = useSelector(allIngredients)

  const [scrollCoordinate, setScrollCoordinate] = useState(1)

  const handleScroll = (e) => {
    console.log(e.currentTarget.scrollTop)
    if (e.currentTarget.scrollTop < 288) {
      setScrollCoordinate('one')
    } else if (
      e.currentTarget.scrollTop < 801 &&
      e.currentTarget.scrollTop > 289
    ) {
      setScrollCoordinate('two')
    } else if (
      e.currentTarget.scrollTop < 1400 &&
      e.currentTarget.scrollTop > 802
    ) {
      setScrollCoordinate('three')
    }
  }

  return (
    <section className={styles.burgeringredients}>
      <ScrollContext.Provider value={{ scrollCoordinate, setScrollCoordinate }}>
        <Title
          type='h1'
          style={styles.burgeringredients__title}
          title='Соберите Бургер'
        />
        <FillMenu />
        <div
          className={`${'custom-scroll'} ${styles.burgeringredients__menu}`}
          onScroll={handleScroll}
        >
          <Title
            type='h2'
            style={styles.burgeringredients__subtitle}
            title='Булки'
            id='Buns'
          />
          <FillRenderer
            data={ingredients}
            openPopup={openModal}
            part='bun'
            id='Buns'
          />
          <Title
            type='h2'
            style={styles.burgeringredients__subtitle}
            title='Соусы'
            id='Sauces'
          />
          <FillRenderer
            data={ingredients}
            openPopup={openModal}
            part='sauce'
            id='Sauces'
          />
          <Title
            type='h2'
            style={styles.burgeringredients__subtitle}
            title='Начинка'
            id='Main'
          />
          <FillRenderer
            data={ingredients}
            openPopup={openModal}
            part='main'
            id='Main'
          />
        </div>
        {isModalOpen && (
          <Modal closePopup={closeModal}>
            <IngredientsDetails />
          </Modal>
        )}
      </ScrollContext.Provider>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType),
}
