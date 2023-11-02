import styles from './ingredients-details.module.css'
import Title from '../title/title'
import ProductData from '../product-data/product-data'
import PropTypes from 'prop-types'

export default function IngredientsDetails(props) {
  return (
    <div className={styles.ingredients}>
      <Title
        style={styles.ingredients__title}
        title='Детали ингредиента'
        type='h1'
      />
      <div className={styles.ingredients__description}>
        <img className={styles.ingredients__image} src={props.img}></img>
        <p
          className={`${'text text_type_main-medium'} ${
            styles.ingredients__caption
          }`}
        >
          {props.name}
        </p>
        <div className={styles.ingredients__components}>
          <ProductData name='Калории,ккал' value={props.calories} />
          <ProductData name='Белки, г' value={props.proteins} />
          <ProductData name='Жиры, г' value={props.fat} />
          <ProductData name='Углеводы, г' value={props.carbohydrates} />
        </div>
      </div>
    </div>
  )
}

IngredientsDetails.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  carbohydrates: PropTypes.number,
}
