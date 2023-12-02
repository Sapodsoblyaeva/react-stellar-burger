import styles from './menu-item.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCardNewPlace,
  deleteIngredient,
} from '../../services/constructor-ingredients/action'
import { useDrag, useDrop } from 'react-dnd'
import { hover } from '@testing-library/user-event/dist/hover'
import { useRef } from 'react'
import { constructorIngredients } from '../../services/constructor-ingredients/selectors'

function MenuItem(props) {
  const { components } = useSelector(constructorIngredients)
  const dispatch = useDispatch()
  const ref = useRef(null)

  const { uuid, index, text } = props

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id))
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { uuid, index, text }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{}, drop] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = components[dragIndex]

    dispatch(deleteIngredient(dragCard.key))
    dispatch(createCardNewPlace(dragCard.item, hoverIndex))
  }

  const opacity = isDragging ? 0 : 1

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
    <div
      className={styles.menuItem__item}
      onClick={() => handleDelete(props.uuid)}
      style={{ ...styles, opacity }}
      ref={ref}
    >
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
  text: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
}
