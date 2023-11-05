import styles from './app.module.css'
import Header from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useState, useEffect } from 'react'
import { apiIngredients } from '../../utils/constants'

function App() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const getIngredients = () => {
      fetch(apiIngredients)
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((result) => setIngredients(result.data))
        .catch(console.error)
    }
    getIngredients()
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__mainPage}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  )
}

export default App
