import { BurgerIngredientsType } from '../../utils/types'
import styles from './brief-order-view.module.css'

type Props = {
  data: BurgerIngredientsType
  type?: string
  qnty?: number
  index?: number
}

export const BriefOrderView = ({ data, type, qnty, index }: Props) => {
  return (
    <div className={styles.briefOrder__imageContainer}>
      <img
        className={styles.briefOrder__image}
        src={data.image_mobile}
        alt={data.name}
      />
      {type === 'feedItem' && (
        <>
          <div className={styles.briefOrder__overlay} />
          <span
            className={`${
              styles.briefOrder__counter
            } ${'text text_type_digits-default'}`}
          >
            {`+${qnty}`}
          </span>
        </>
      )}
    </div>
  )
}
