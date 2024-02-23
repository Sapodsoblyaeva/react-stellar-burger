import styles from './menu-item.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { XYCoord, useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import { constructorComponents } from '../../services/constructor-ingredients/selector'
import {
  burgerCardAdd,
  burgerIngredientsDelete,
} from '../../services/constructor-ingredients/reducer'
import { useAppSelector } from '../../hooks/useSelector'
import { useAppDispatch } from '../../hooks/useDispatch'

type Props = {
  uuid?: string
  index: number
  text: string
  type?: 'bottom' | 'top' | undefined
  price: number
  isLocked: boolean
  thumbnail: string
  key?: string
}

type Item = {
  index: number
}

const MenuItem = (props: Props) => {
  const { comp } = useAppSelector(constructorComponents)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLInputElement>(null)

  const { uuid, index, text } = props

  const handleDelete = (id: string) => {
    dispatch(burgerIngredientsDelete(id))
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

  const [, drop] = useDrop({
    accept: 'card',
    hover: (item: Item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex: number = item!.index
      const hoverIndex: number = props!.index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY: number =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset: XYCoord | null = monitor.getClientOffset()

      const hoverClientY: number = clientOffset!.y - hoverBoundingRect.top

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

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = comp[dragIndex]

    dispatch(burgerIngredientsDelete(dragCard.key))
    dispatch(burgerCardAdd({ data: dragCard.data, hoverIndex: hoverIndex }))
  }

  const opacity: number = isDragging ? 0 : 1

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
      onClick={() => handleDelete(uuid === undefined ? '' : uuid)}
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
