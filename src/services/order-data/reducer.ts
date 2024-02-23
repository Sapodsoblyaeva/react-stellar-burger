import { createSlice } from '@reduxjs/toolkit'
import { findOrder, loadOrder } from './action'
import { OrderFromServerInfo, ProfileOrdersFromServer } from '../../utils/types'

export type OrderDataState = {
  orderNumber: number | string
  orderFromServer: OrderFromServerInfo
  loading: boolean
  error: string | unknown
}

export type Order = {
  order: {
    number: number
  }
} & ProfileOrdersFromServer

const initialState: OrderDataState = {
  orderNumber: 0,
  orderFromServer: {
    createdAt: '',
    ingredients: [],
    name: '',
    status: '',
    number: 0,
    _id: '',
    updatedAt: '',
  },
  loading: true,
  error: '',
}

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadOrder.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(loadOrder.fulfilled, (state, action) => {
      const { order } = action.payload
      state.orderNumber = order.number
      state.loading = false
    })
    builder.addCase(loadOrder.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(findOrder.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(findOrder.fulfilled, (state, action) => {
      state.orderFromServer = action.payload.orders[0]
      state.loading = false
    })
    builder.addCase(findOrder.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})

export default orderDataSlice.reducer
