import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { BurgerIngredientsType } from '../../utils/types'

type Card = {
  card: BurgerIngredientsType | null
}

const initialState: Card = {
  card: null,
}

export const ingredientCardSlice = createSlice({
  name: 'ingredientCard',
  initialState,
  reducers: {
    getIngredientCard(state, action: PayloadAction<BurgerIngredientsType>) {
      state.card = action.payload
    },
  },
})

export const { getIngredientCard } = ingredientCardSlice.actions

export default ingredientCardSlice.reducer
