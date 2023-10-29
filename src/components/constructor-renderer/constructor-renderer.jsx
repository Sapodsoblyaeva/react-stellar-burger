import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'
import { constructorRendererPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types'

const ConstructorRenderer = ({ data }) => (
  <div className={`${styles.constructorRenderer__menu}`}>
    {data.map(
      (item) =>
        item._id === '643d69a5c3f7b9001cfa093c' && (
          <MenuItem
            key={item._id}
            text={`${item.name} (верх)`}
            thumbnail={item.image}
            price={item.price}
            type='top'
            isLocked={true}
          />
        )
    )}
    <div
      className={`${'custom-scroll'} ${styles.constructorRenderer__positions}`}
    >
      {data.map((item) =>
        item.type !== 'bun' ? (
          <MenuItem
            key={item._id}
            text={item.name}
            thumbnail={item.image}
            price={item.price}
          />
        ) : (
          console.log()
        )
      )}
    </div>
    {data.map(
      (item) =>
        item._id === '643d69a5c3f7b9001cfa093c' && (
          <MenuItem
            key={item._id}
            text={`${item.name} (низ)`}
            thumbnail={item.image}
            price={item.price}
            type='bottom'
            isLocked={true}
          />
        )
    )}
  </div>
)

export default ConstructorRenderer

ConstructorRenderer.propTypes = {
  data: PropTypes.arrayOf(constructorRendererPropType),
}
