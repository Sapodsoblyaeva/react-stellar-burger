import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './home.module.css'

export const Home = () => {
  const [elements, setElements] = useState([])
  const [draggedElemtns, setDraggedElements] = useState([])

  const onDropHandler = (item) => {
    setDraggedElements([...draggedElemtns, item])
    setElements(elements.filter((el) => el.id !== item.id))
  }

  return (
    <>
      <main className={styles.homepage}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={onDropHandler} />
        </DndProvider>
      </main>
    </>
  )
}
