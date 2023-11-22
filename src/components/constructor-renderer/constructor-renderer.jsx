import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'
import { ComponentsContext } from '../../services/app-context'
import { useContext, useMemo } from 'react'

export default function ConstructorRenderer() {
  const { components } = useContext(ComponentsContext)

  const content = useMemo(() => {
    return (
      <>
        {components.component.map(
          (item) =>
            item.type === 'bun' && (
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
          className={`${'custom-scroll'} ${
            styles.constructorRenderer__positions
          }`}
        >
          {components.component.length !== 0 &&
            components.component.map(
              (item, index) => item.type !== 'bun' && console.log(item._id)
              // <MenuItem
              //   key={index}
              //   text={item.name}
              //   thumbnail={item.image}
              //   price={item.price}
              // />
            )}
        </div>
        {components.component.map(
          (item) =>
            item.type === 'bun' && (
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
      </>
    )
  }, [components])

  return <div className={`${styles.constructorRenderer__menu}`}>{content}</div>
}
