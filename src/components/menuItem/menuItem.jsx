import styles from './menuItem.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function MenuItem(props) {
  return (
    <div className={styles.menuItem__item}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={props.text}
        price={props.price}
        thumbnail={props.thumbnail}
        type={props.type}
        isLocked={props.isLocked}
      />
    </div>
  )
}

export default MenuItem
