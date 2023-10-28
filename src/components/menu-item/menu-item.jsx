import styles from './menu-item.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { menuItemPropType } from '../../utils/prop-types'

function MenuItem(props) {
  return props.type !== undefined ? (
    <div className={`${styles.menuItem__item} ${styles.menuItem__topping}`}>
      <ConstructorElement
        text={props.text}
        price={props.price}
        thumbnail={props.thumbnail}
        type={props.type}
        isLocked={props.isLocked}
      />
    </div>
  ) : (
    <div className={styles.menuItem__item}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={props.text}
        price={props.price}
        thumbnail={props.thumbnail}
      />
    </div>
  )
}

export default MenuItem

MenuItem.propTypes = {
  props: menuItemPropType,
}
