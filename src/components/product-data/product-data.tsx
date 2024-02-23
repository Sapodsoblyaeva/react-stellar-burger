import styles from './product-data.module.css'

type Props = {
  name: string
  value: number
}

const ProductData = (props: Props) => {
  return (
    <ul className={styles.productData}>
      <li className='text text_type_main-small text_color_inactive'>
        {props.name}
      </li>
      <li className='text_color_inactive text_type_digits-default text'>
        {props.value}
      </li>
    </ul>
  )
}

export default ProductData
