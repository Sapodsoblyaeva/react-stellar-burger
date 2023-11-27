import styles from './app.module.css'
import Header from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useState, useEffect } from 'react'
import { TotalPriceContext } from '../../services/app-context'
import { useDispatch, useSelector } from 'react-redux'
import { allIngredients } from '../../services/ingredients/selectors'
import { loadIngredients } from '../../services/ingredients/action'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [elements, setElements] = useState([])
  const [draggedElemtns, setDraggedElements] = useState([])
  const { loading, error } = useSelector(allIngredients)

  const dispatchIngredients = useDispatch()

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    dispatchIngredients(loadIngredients())
  }, [])

  if (loading) {
    return <h2>Loading..</h2>
  }

  if (!loading && error) {
    return <h2>Something's gone wrong...</h2>
  }

  const onDropHandler = (item) => {
    setDraggedElements([...draggedElemtns, item])
    setElements(elements.filter((el) => el.id !== item.id))
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__mainPage}>
        <DndProvider backend={HTML5Backend}>
          <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
            <BurgerIngredients />
            <BurgerConstructor onDropHandler={onDropHandler} />
          </TotalPriceContext.Provider>
        </DndProvider>
      </main>
    </div>
  )
}

export default App
