import { AnyAction, MiddlewareAPI } from 'redux'
import { AppState } from '../store'
import { AppDispatch } from '../../hooks/useDispatch'

export const customMiddleware = () => {
  return (store: MiddlewareAPI) => {
    return (next: (action: AnyAction) => void) => {
      return (
        action: (dispatch: AppDispatch, getState: () => AppState) => AnyAction
      ) => {
        if (typeof action === 'function') {
          action(store.dispatch, store.getState)
          return
        }
        return next(action)
      }
    }
  }
}
