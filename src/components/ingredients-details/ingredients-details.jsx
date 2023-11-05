import styles from './ingredients-details.module.css'
import Title from '../title/title'
import ProductData from '../product-data/product-data'
import PropTypes from 'prop-types'

export default function IngredientsDetails({ data }) {
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
          src={data.image}
          alt={data.name}
        ></img>
        <p
          className={`${'text text_type_main-medium'} ${
            styles.ingredients__caption
          }`}
        >
          {data.name}
        </p>
        <div className={styles.ingredients__components}>
          <ProductData name='Калории,ккал' value={data.calories} />
          <ProductData name='Белки, г' value={data.proteins} />
          <ProductData name='Жиры, г' value={data.fat} />
          <ProductData name='Углеводы, г' value={data.carbohydrates} />
        </div>
      </div>
    </div>
  )
}

IngredientsDetails.propTypes = {
  data: PropTypes.object,
}
