import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import Title from '../title/title'
import FillRenderer from '../fill-renderer/fill-renderer'
import { useState, useEffect } from 'react'
import { apiIngredients } from '../../utils/constants'

export default function BurgerIngredients() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const getIngredients = () => {
      fetch(apiIngredients)
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((result) => setIngredients(result.data))
        .catch((error) => console.error(error))
    }
    getIngredients()
  }, [])

  return (
    <section className={styles.burgeringredients}>
      <Title
        type='h1'
        style={styles.burgeringredients__title}
        title='Соберите Бургер'
      />
      <FillMenu />
      <div className={`${'custom-scroll'} ${styles.burgeringredients__menu}`}>
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Булки'
        />
        <FillRenderer data={ingredients} part='bun' />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Соусы'
        />
        <FillRenderer data={ingredients} part='sauce' />
        <Title
          type='h2'
          style={styles.burgeringredients__subtitle}
          title='Начинка'
        />
        <FillRenderer data={ingredients} part='main' />
      </div>
    </section>
  )
}
