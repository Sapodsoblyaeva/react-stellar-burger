import styles from './app.module.css'
import { data } from '../../utils/data'
import Header from '../header/header'
import BurgerIngredients from '../burgerIngredients/burger-ingredients'
import Cart from '../cart/cart'

function App() {
  return (
    <div className={styles.app}>
      {/* <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
      	Измените src/components/app/app.jsx и сохраните для обновления.
      </pre> */}
      <Header />
    <div className={styles.app__mainPage}>
        <BurgerIngredients />
        <Cart />
      </div>
    </div>
  )
}

export default App
