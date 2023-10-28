import styles from './fill-renderer.module.css'
import BurgerCard from '../burger-card/burger-card'

const FillRenderer = ({ data, part }) => (
  <div>
    <div className={styles.fillRenderer__card}>
      {data.map(
        (item) =>
          item.type === part && (
            <BurgerCard
              key={item._id}
              text={item.name}
              img={item.image}
              price={item.price}
              alt={item.name}
            />
          )
      )}
    </div>
  </div>
)

export default FillRenderer
