import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './home.module.css'
import { BurgerIngredientsType } from '../utils/types'

export const Home = () => {
  const [elements, setElements] = useState<BurgerIngredientsType[]>([])
  const [draggedElemtns, setDraggedElements] = useState<
    BurgerIngredientsType[]
  >([])

  const onDropHandler = (item: BurgerIngredientsType) => {
    setDraggedElements([...draggedElemtns, item])
    setElements(elements.filter((el) => el._id !== item._id))
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
