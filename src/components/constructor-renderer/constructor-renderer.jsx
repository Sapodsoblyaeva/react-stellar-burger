import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constructorIngredients } from '../../services/constructor-ingredients/selector'
import { useDrop } from 'react-dnd'
import {
  addBun,
  addIngredient,
} from '../../services/constructor-ingredients/action'
import PropTypes from 'prop-types'

export default function ConstructorRenderer({ onDropHandler }) {
  const { components } = useSelector(constructorIngredients)

  const dispatch = useDispatch()

  const typeOfIngredient = (item) => {
    item.type === 'bun' ? dispatch(addBun(item)) : dispatch(addIngredient(item))
  }

  const [, dropRef] = useDrop({
    accept: 'ingredients',
    drop(item) {
      onDropHandler(item)
      typeOfIngredient(item)
    },
  })

  const content = useMemo(() => {
    return (
      <>
        {components.length !== 0 &&
          components.map(
            (component) =>
              component.item.type === 'bun' && (
                <MenuItem
                  key={component.key}
                  text={`${component.item.name} (верх)`}
                  thumbnail={component.item.image}
                  price={component.item.price}
                  type='top'
                  isLocked={true}
                />
              )
          )}
        <div
          className={`${'custom-scroll'} ${
            styles.constructorRenderer__positions
          }`}
        >
          {components.length !== 0 &&
            components.map(
              (component, index) =>
                component.item.type !== 'bun' && (
                  <MenuItem
                    key={component.key}
                    text={component.item.name}
                    thumbnail={component.item.image}
                    price={component.item.price}
                    uuid={component.key}
                    index={index}
                  />
                )
            )}
        </div>
        {components.length !== 0 &&
          components.map(
            (component) =>
              component.item.type === 'bun' && (
                <MenuItem
                  key={component.key}
                  text={`${component.item.name} (низ)`}
                  thumbnail={component.item.image}
                  price={component.item.price}
                  type='bottom'
                  isLocked={true}
                />
              )
          )}
      </>
    )
  }, [components])

  return (
    <div className={`${styles.constructorRenderer__menu}`} ref={dropRef}>
      {content}
    </div>
  )
}

ConstructorRenderer.propTypes = {
  onDropHandler: PropTypes.func,
}
