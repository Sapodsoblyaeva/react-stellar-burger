import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'
import { ReactNode, useMemo } from 'react'
import { constructorComponents } from '../../services/constructor-ingredients/selector'
import { useDrop } from 'react-dnd'
import { BurgerIngredientsType, ItemType } from '../../utils/types'
import {
  burgerIngredientsAdd,
  burgerBunAdd,
} from '../../services/constructor-ingredients/reducer'
import { useAppSelector } from '../../hooks/useSelector'
import { useAppDispatch } from '../../hooks/useDispatch'

type Props = {
  onDropHandler(item: BurgerIngredientsType): void
}

const ConstructorRenderer = ({ onDropHandler }: Props) => {
  const { comp } = useAppSelector(constructorComponents)
  const dispatch = useAppDispatch()

  const typeOfIngredient = (item: BurgerIngredientsType) => {
    item.type === 'bun'
      ? dispatch(burgerBunAdd(item))
      : dispatch(burgerIngredientsAdd(item))
  }

  const [, dropRef] = useDrop({
    accept: 'ingredients',
    drop(item: BurgerIngredientsType) {
      onDropHandler(item)
      typeOfIngredient(item)
    },
  })

  const content: ReactNode = useMemo(() => {
    return (
      <>
        {comp.length !== 0 &&
          comp.map(
            (component: ItemType) =>
              component.data !== undefined &&
              component.data.type === 'bun' && (
                <MenuItem
                  key={component.key}
                  text={`${component.data.name} (верх)`}
                  thumbnail={component.data.image}
                  price={component.data.price}
                  type='top'
                  isLocked={true}
                  index={0}
                />
              )
          )}
        <div
          className={`${'custom-scroll'} ${
            styles.constructorRenderer__positions
          }`}
        >
          {comp.length !== 0 &&
            comp.map(
              (component: ItemType, index: number) =>
                component.data !== undefined &&
                component.data.type !== 'bun' && (
                  <MenuItem
                    key={component.key}
                    text={component.data.name}
                    thumbnail={component.data.image}
                    price={component.data.price}
                    uuid={component.key}
                    index={index}
                    isLocked={false}
                  />
                )
            )}
        </div>
        {comp.length !== 0 &&
          comp.map(
            (component: ItemType) =>
              component.data !== undefined &&
              component.data.type === 'bun' && (
                <MenuItem
                  key={component.key}
                  text={`${component.data.name} (низ)`}
                  thumbnail={component.data.image}
                  price={component.data.price}
                  type='bottom'
                  isLocked={true}
                  index={0}
                />
              )
          )}
      </>
    )
  }, [comp])

  return (
    <div className={`${styles.constructorRenderer__menu}`} ref={dropRef}>
      {content}
    </div>
  )
}

export default ConstructorRenderer
