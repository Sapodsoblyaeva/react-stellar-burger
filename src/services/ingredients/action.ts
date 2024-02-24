import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/api'
import { Type } from './reducer'

export const loadIngredients = createAsyncThunk<Type>(
  'ingredients/loadIngredients',
  async () => {
    const res = await getIngredients()
    return res as Type
  }
)
