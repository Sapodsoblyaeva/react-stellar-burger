import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/api'
import { Type } from './reducer'

export const loadIngredients = createAsyncThunk<Type>(
  'ingredients/loadIngredients',
  async () => {
    try {
      const res = await getIngredients()
      return res as Type
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)
