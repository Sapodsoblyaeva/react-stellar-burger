import styles from './app.module.css'
import Header from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useState, useEffect } from 'react'
import { TotalPriceContext } from '../../services/app-context'
import { useDispatch, useSelector } from 'react-redux'
import { allIngredients } from '../../services/ingredients/selectors'
import { loadIngredients } from '../../services/ingredients/action'

function App() {
  const { loading, error } = useSelector(allIngredients)

  const dispatchIngredients = useDispatch()

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    dispatchIngredients(loadIngredients())
  }, [])

  if (loading) {
    return <h2>Loading..</h2>
    // console.log('Loading...')
  }

  // if (!loading) {
  //   return <h2>Success!!!</h2>
  //   // console.log('Success!!!')
  // }

  if (!loading && error) {
    return <h2>Something's gone wrong...</h2>
    // console.log("Something's gone wrong...")
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__mainPage}>
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </TotalPriceContext.Provider>
      </main>
    </div>
  )
}

export default App
