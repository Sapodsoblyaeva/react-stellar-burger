import styles from './constructor-renderer.module.css'
import MenuItem from '../menu-item/menu-item'

const ConstructorRenderer = ({ data }) => (
  <div className={`${styles.constructorRenderer__menu}`}>
    {data.map(
      (item) =>
        item._id === '60666c42cc7b410027a1a9b1' && (
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
        item._id === '60666c42cc7b410027a1a9b1' && (
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
