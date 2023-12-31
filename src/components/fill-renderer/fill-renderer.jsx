import styles from './fill-renderer.module.css'
import BurgerCard from '../burger-card/burger-card'
import { fillRendererPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types'

export default function FillRenderer({ data, part, openPopup }) {
  return (
    <div>
      <div className={styles.fillRenderer__card}>
        {data.map(
          (item) =>
            item.type === part && (
              <BurgerCard key={item._id} data={item} openPopup={openPopup} />
            )
        )}
      </div>
    </div>
  )
}

FillRenderer.propTypes = {
  data: PropTypes.arrayOf(fillRendererPropType),
  part: PropTypes.string.isRequired,
  openPopup: PropTypes.func,
}
