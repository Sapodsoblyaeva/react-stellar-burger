import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import Title from '../title/title'
import FillRenderer from '../fill-renderer/fill-renderer'
import { useModal } from '../../hooks/useModal'
import { allIngredients } from '../../services/ingredients/selector'
import { UIEvent, useState } from 'react'
import { ScrollContext } from '../../services/app-context'
import { useAppSelector } from '../../hooks/useSelector'

const BurgerIngredients = () => {
  const { openModal } = useModal()
  const { ingredients } = useAppSelector(allIngredients)

  const [scrollCoordinate, setScrollCoordinate] = useState<string>('one')

  const handleScroll = (e: UIEvent<HTMLDivElement> ) => {
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
          />
          <FillRenderer
            data={ingredients}
            openPopup={() => openModal}
            part='bun'
          />
          <Title
            type='h2'
            style={styles.burgeringredients__subtitle}
            title='Соусы'
          />
          <FillRenderer
            data={ingredients}
            openPopup={() => openModal}
            part='sauce'
          />
          <Title
            type='h2'
            style={styles.burgeringredients__subtitle}
            title='Начинка'
          />
          <FillRenderer
            data={ingredients}
            openPopup={() => openModal}
            part='main'
          />
        </div>
      </ScrollContext.Provider>
    </section>
  )
}

export default BurgerIngredients
