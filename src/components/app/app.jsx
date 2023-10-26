import styles from './app.module.css'
import Header from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app__mainPage}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  )
}

export default App
