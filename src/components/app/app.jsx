import styles from './app.module.css'
import Header from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useState, useEffect, useReducer } from 'react'
import { apiIngredients, orderNumberApi } from '../../utils/constants'
import {
  AppContext,
  ComponentsContext,
  TotalPriceContext,
  OrderNumberContext,
} from '../../services/app-context'

const createInitialState = () => {
  const initialState = []
  return {
    component: initialState,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { component: [action.component, ...state.component] }
    case 'add-bun':
      return { component: [action.component] }
    case 'reset':
      return {}
    default:
      throw new Error(`Wrong type of action: ${action.type}`)
  }
}

function App() {
  const [ingredients, setIngredients] = useState([])
  const [components, dispatch] = useReducer(reducer, [], createInitialState)
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderNumber, setOrderNumber] = useState(0)

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

  let arr = []
  components.component.map((item) => {
    arr.push(item._id)
  })

  const addNewOrder = () => {
    fetch(orderNumberApi, {
      method: 'POST',
      headers: {
        authorization: '08ca101b-72c0-46c7-a5af-c036f69dd465',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: arr,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((result) => {
        setOrderNumber(result.order.number)
      })
      .catch(console.error)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__mainPage}>
        <AppContext.Provider value={{ ingredients, setIngredients }}>
          <ComponentsContext.Provider value={{ components, dispatch }}>
            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
              <OrderNumberContext.Provider
                value={{ orderNumber, setOrderNumber, addNewOrder }}
              >
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor />
              </OrderNumberContext.Provider>
            </TotalPriceContext.Provider>
          </ComponentsContext.Provider>
        </AppContext.Provider>
      </main>
    </div>
  )
}

export default App
