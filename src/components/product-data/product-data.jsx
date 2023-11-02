import styles from "./product-data.module.css"
import PropTypes from 'prop-types'

export default function ProductData(props) {
  return (
    <ul className={styles.productData}>
      <li className="text text_type_main-small text_color_inactive">{props.name}</li>
      <li className="text_color_inactive text_type_digits-default text">{props.value}</li>
    </ul>
  )
}

ProductData.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
}