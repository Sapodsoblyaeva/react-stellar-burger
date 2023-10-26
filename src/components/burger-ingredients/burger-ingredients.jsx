import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import BurgerCard from '../burger-card/burger-card'
import Title from '../title/title'
import { data } from '../../utils/data'
import { ingredientPropType } from '../../utils/prop-types'

function BurgerIngredients() {
  return (
    <div className={styles.burgeringredients}>
      <Title
        type='h1'
        style={styles.burgeringredients__title}
        title='Соберите Бургер'
      />
      <FillMenu />
      <Title
        type='h2'
        style={styles.burgeringredients__subtitle}
        title='Булки'
      />
      <div className={`${'custom-scroll'} ${styles.burgeringredients__menu}`}>
        <div className={styles.burgeringredients__card}>
          <BurgerCard
            img={data[0].image}
            text={data[0].name}
            price={data[0].price}
          />
          <BurgerCard
            img={data[14].image}
            text={data[14].name}
            price={data[14].price}
          />
        </div>
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Соусы'
        />
        <div className={styles.burgeringredients__card}>
          <BurgerCard
            img={data[3].image}
            text={data[3].name}
            price={data[3].price}
          />
          <BurgerCard
            img={data[6].image}
            text={data[6].name}
            price={data[6].price}
          />
          <BurgerCard
            img={data[5].image}
            text={data[5].name}
            price={data[5].price}
          />
          <BurgerCard
            img={data[9].image}
            text={data[9].name}
            price={data[9].price}
          />
        </div>
      </div>
    </div>
  )
}

export default BurgerIngredients

BurgerIngredients.propTypes = {
  text: ingredientPropType,
  price: ingredientPropType,
}
