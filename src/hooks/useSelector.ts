import { AppState } from '../services/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
