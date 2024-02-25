import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../services/store'
import { AnyAction } from 'redux'

export type AppDispatch = ThunkDispatch<AppState, never, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
