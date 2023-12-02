import { composeWithDevTools } from 'redux-devtools-extension'
import { customMiddleware } from './middleware/custom-middleware'
import { reducer } from './reducer'
import { applyMiddleware, createStore } from 'redux'

const middleWare = customMiddleware()

export const configureStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleWare))
  )
  return store
}
