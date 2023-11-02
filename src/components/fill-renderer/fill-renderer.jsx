import styles from './fill-renderer.module.css'
import BurgerCard from '../burger-card/burger-card'
import { fillRendererPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types'

export default function FillRenderer({ data, part }) {
  return (
    <div>
      <div className={styles.fillRenderer__card}>
        {data.map(
          (item) =>
            item.type === part && (
              <div key={item._id}>
                <BurgerCard
                  key={item._id}
                  text={item.name}
                  img={item.image}
                  price={item.price}
                  alt={item.name}
                  calories={item.calories}
                  fat={item.fat}
                  proteins={item.proteins}
                  carbohydrates={item.carbohydrates}
                />
              </div>
            )
        )}
      </div>
    </div>
  )
}

FillRenderer.propTypes = {
  data: PropTypes.arrayOf(fillRendererPropType),
  part: PropTypes.string.isRequired,
}
