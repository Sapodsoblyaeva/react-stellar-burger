import styles from './fill-renderer.module.css'
import BurgerCard from '../burger-card/burger-card'
import { BurgerIngredientsType } from '../../utils/types'

type Props = {
  data: BurgerIngredientsType[]
  part: string
  openPopup: () => {}
}

const FillRenderer = ({ data, part, openPopup }: Props) => {
  return (
    <div>
      <div className={styles.fillRenderer__card}>
        {data.map(
          (item) =>
            item.type === part && (
              <BurgerCard key={item._id} data={item} openPopup={openPopup} />
            )
        )}
      </div>
    </div>
  )
}

export default FillRenderer
