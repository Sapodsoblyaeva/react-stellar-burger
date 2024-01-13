import styles from './ingredients-details.module.css'
import Title from '../title/title'
import ProductData from '../product-data/product-data'
import { useSelector } from 'react-redux'
import { ingredient } from '../../services/ingredient-сard/selector'
import { allIngredients } from '../../services/ingredients/selector'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function IngredientsDetails() {
  const [state, setState] = useState(false)

  const location = useLocation()

  const id = location.pathname.split('/').slice(2).join()

  const { ingredients, loading, error } = useSelector(allIngredients)

  const itemCard = ingredients.find((item) => item._id === id)

  useEffect(() => {
    setState(true)
  }, [loading, itemCard])

  const { card } = useSelector(ingredient)

  if (loading) {
    return <h2>Loading..</h2>
  }

  if (!loading && error) {
    return <h2>Something's gone wrong...</h2>
  }

  return (
    <>
      {state && (
        <div className={styles.ingredients}>
          <Title
            style={styles.ingredients__title}
            title='Детали ингредиента'
            type='h1'
          />
          <div className={styles.ingredients__description}>
            <img
              className={styles.ingredients__image}
              src={card !== null ? card.image : itemCard.image}
              alt={card !== null ? card.name : itemCard.name}
            ></img>
            <p
              className={`${'text text_type_main-medium'} ${
                styles.ingredients__caption
              }`}
            >
              {card !== null ? card.name : itemCard.name}
            </p>
            <div className={styles.ingredients__components}>
              <ProductData
                name='Калории,ккал'
                value={card !== null ? card.calories : itemCard.calories}
              />
              <ProductData
                name='Белки, г'
                value={card !== null ? card.proteins : itemCard.proteins}
              />
              <ProductData
                name='Жиры, г'
                value={card !== null ? card.fat : itemCard.fat}
              />
              <ProductData
                name='Углеводы, г'
                value={
                  card !== null ? card.carbohydrates : itemCard.carbohydrates
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
