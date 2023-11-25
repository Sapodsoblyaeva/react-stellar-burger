import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { constructorIngredients } from '../../services/constructor-ingredients/selectors'

export default function ConstructorRenderer() {
  const { components } = useSelector(constructorIngredients)

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
              (component) =>
                component.item.type !== 'bun' && (
                  <MenuItem
                    key={component.key}
                    text={component.item.name}
                    thumbnail={component.item.image}
                    price={component.item.price}
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

  return <div className={`${styles.constructorRenderer__menu}`}>{content}</div>
}
