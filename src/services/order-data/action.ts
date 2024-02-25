import { createAsyncThunk } from '@reduxjs/toolkit'
import { addNewOrder, getOrder } from '../../utils/api'
import { ProfileOrdersFromServer } from '../../utils/types'
import { Order } from './reducer'
import { burgerIngredientsReset } from '../constructor-ingredients/reducer'

export const loadOrder = createAsyncThunk<Order, string[]>(
  'orderData/loadOrder',
  async (arr) => {
    try {
      const res = (await addNewOrder(arr)) as Order
      return res
    } finally {
      burgerIngredientsReset()
    }
  }
)

export const findOrder = createAsyncThunk<ProfileOrdersFromServer, number>(
  'orderData/findOrder',
  async (number) => {
    const res = await getOrder(number)
    return res
  }
)
