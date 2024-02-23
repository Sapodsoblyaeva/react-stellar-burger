export const customMiddleware = () => {
  return (store) => {
    return (next) => {
      return (action) => {
        if (typeof action === 'function') {
          action(store.dispatch, store.getState)
          return
        }
        return next(action)
      }
    }
  }
}


