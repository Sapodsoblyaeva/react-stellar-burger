import { composeWithDevTools } from 'redux-devtools-extension'
import { customMiddleware } from './middleware/custom-middleware'
import { reducer } from './reducer'
import { applyMiddleware, createStore } from 'redux'
// import { thunkMiddleWare } from 'react-thunk'

const middleWare = customMiddleware()

export const configureStore = () => {
  //thunkMiddleWare || middleWare
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleWare))
  )
  return store
}

// store ={
//   tasks: {
//     tasks: [], //components,
//   }
//   auth: {
//     user: null,
//   }
// }
