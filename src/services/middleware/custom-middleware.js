// import { DELETE_TASK } from '../ingredients/action'

export const customMiddleware = () => {
  return (store) => {
    return (next) => {
      return (action) => {
        // console.log('store after dispatch', store)
        // console.log('will dispatch', action)
        // console.log('dispatch', next)
        // if(action.type === ADD_TASK) {
        //     console.log("ADD TASK !!!!!!")
        //     store.dispatch({type: DELETE_TASK})
        if (typeof action === 'function') {
          action(store.dispatch, store.getState)
          return
        }
        return next(action)
      }
    }
  }
}
