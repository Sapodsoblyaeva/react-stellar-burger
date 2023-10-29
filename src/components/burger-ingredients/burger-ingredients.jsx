import styles from './burger-ingredients.module.css'
import FillMenu from '../fill-menu/fill-menu'
import Title from '../title/title'
// import { data } from '../../utils/data'
import FillRenderer from '../fill-renderer/fill-renderer'
import { useState, useEffect } from 'react'

export const apiIngredients =
  'https://norma.nomoreparties.space/api/ingredients'

function BurgerIngredients() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const getIngredients = () => {
      fetch(apiIngredients)
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then(result => setIngredients(result.data))
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

export default BurgerIngredients

const Film = ({ data }) => {
  const image = (
    <img
      src={
        data.image
          ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
          : 'https://via.placeholder.com/250x150'
      }
      alt={data.nameRU}
    />
  )
  return (
    <div>
      <div className={styles.img}>{image}</div>
      <p className={styles.name}>{data.nameRU}</p>
      <p className={styles.description}>{`${data.year}, ${data.country}`}</p>
      <p className={styles.description}>{`${data.duration} мин.`}</p>
    </div>
  )
}

export const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  })

  useEffect(() => {
    const getFilms = () => {
      setState({ ...state, hasError: false, isLoading: true })
      fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then((res) => res.json())
        .then((data) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false })
        })
    }
    getFilms()
  }, [])

  const { data, isLoading, hasError } = state

  return (
    <div className={`${styles.app} ${styles.grid}`}>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        data.length &&
        data.map((film, index) => <Film key={index} data={film} />)}
    </div>
  )
}
