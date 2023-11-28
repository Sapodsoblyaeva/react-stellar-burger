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
import { order } from '../../services/order-data/selectors'
import { resetConstructor } from '../../services/constructor-ingredients/action'

function App() {
  const [elements, setElements] = useState([])
  const [draggedElemtns, setDraggedElements] = useState([])
  const { loading, error } = useSelector(allIngredients)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadIngredients())
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
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={onDropHandler} />
        </DndProvider>
      </main>
    </div>
  )
}

export default App
