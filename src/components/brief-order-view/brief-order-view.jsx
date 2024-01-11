import styles from './brief-order-view.module.css'
import PropTypes from 'prop-types'

export const BriefOrderView = ({ data, type, qnty}) => {
  return (
    <>
      {type !== 'feedItem' ? (
        <div className={styles.briefOrder__imageContainer}>
          <img
            className={styles.briefOrder__image}
            src={data.image_mobile}
            alt={data.name}
          ></img>
        </div>
      ) : (
        <div className={styles.briefOrder__imageContainer}>
          <img
            className={styles.briefOrder__image}
            src={data.image_mobile}
            alt={data.name}
          ></img>
          <div className={styles.briefOrder__overlay}></div>
          <span
            className={`${
              styles.briefOrder__counter
            } ${'text text_type_digits-default'}`}
          >{`+${qnty}`}</span>
        </div>
      )}
    </>
  )
}

BriefOrderView.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  qnty: PropTypes.number,
}

