import styles from './ingredients-details.module.css'
import Title from '../title/title'
import ProductData from '../product-data/product-data'
import { useSelector } from 'react-redux'
import { ingredient } from '../../services/ingredient-сard/selectors'
import { useLocation } from 'react-router-dom'

export default function IngredientsDetails() {
  // const { card } = useSelector(ingredient)

  const card =  JSON.parse(localStorage.getItem("ingredients"))

  return (
    <div className={styles.ingredients}>
      <Title
        style={styles.ingredients__title}
        title='Детали ингредиента'
        type='h1'
      />
      <div className={styles.ingredients__description}>
        <img
          className={styles.ingredients__image}
          src={card.image}
          alt={card.name}
        ></img>
        <p
          className={`${'text text_type_main-medium'} ${
            styles.ingredients__caption
          }`}
        >
          {card.name}
        </p>
        <div className={styles.ingredients__components}>
          <ProductData name='Калории,ккал' value={card.calories} />
          <ProductData name='Белки, г' value={card.proteins} />
          <ProductData name='Жиры, г' value={card.fat} />
          <ProductData name='Углеводы, г' value={card.carbohydrates} />
        </div>
      </div>
    </div>
  )
}
