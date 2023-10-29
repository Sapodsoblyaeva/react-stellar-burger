import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import BurgerCard from '../burger-card/burger-card'
import Title from '../title/title'
import { data } from '../../utils/data'
import FillRenderer from '../fill-renderer/fill-renderer'

function BurgerIngredients() {
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
        <FillRenderer data={data} part='bun' />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Соусы'
        />
        <FillRenderer data={data} part='sauce' />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Начинка'
        />
        <FillRenderer data={data} part='main' />
      </div>
    </section>
  )
}

export default BurgerIngredients
