import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './action'
import { BurgerIngredientsType } from '../../utils/types'

export type IngredientsType = {
  ingredients: BurgerIngredientsType[]
  loading: boolean
  error: string | null | unknown
}

export type Type = {
  success: boolean
  data: BurgerIngredientsType[]
}

const initialState: IngredientsType = {
  ingredients: [],
  loading: true,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data
      state.loading = false
    })
    builder.addCase(loadIngredients.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadIngredients.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default ingredientsSlice.reducer
