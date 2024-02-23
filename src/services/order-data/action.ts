import { createAsyncThunk } from '@reduxjs/toolkit'
import { addNewOrder, getOrder } from '../../utils/api'
import { burgerIngredientsReset } from '../constructor-ingredients/reducer'
import { ProfileOrdersFromServer } from '../../utils/types'
import { Order } from './reducer'

export const loadOrder = createAsyncThunk<Order, string[]>(
  'orderData/loadOrder',
  async (arr) => {
    try {
      const res = (await addNewOrder(arr)) as Order
      return res
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      burgerIngredientsReset()
    }
  }
)

export const findOrder = createAsyncThunk<ProfileOrdersFromServer, number>(
  'orderData/findOrder',
  async (number) => {
    try {
      const res = await getOrder(number)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)
