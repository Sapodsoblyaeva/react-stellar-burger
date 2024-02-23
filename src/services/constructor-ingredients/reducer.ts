import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv1 } from 'uuid'
import { BurgerIngredientsType, ItemType } from '../../utils/types'

export type ComponentsData = {
  data: BurgerIngredientsType
  hoverIndex: number
}

export type Components = {
  comp: Array<ItemType>
}

const initialState: Components = {
  comp: [],
}

const ComponentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    burgerIngredientsAdd(state, action: PayloadAction<BurgerIngredientsType>) {
      const data = {
        data: action.payload,
        key: uuidv1(),
      }
      state.comp.push(data)
    },
    burgerCardAdd(state, action: PayloadAction<ComponentsData>) {
      const { hoverIndex, data } = action.payload
      const burgerData = {
        data: data,
        key: uuidv1(),
      }
      state.comp.splice(hoverIndex, 0, burgerData)
    },
    burgerBunAdd(state, action: PayloadAction<BurgerIngredientsType>) {
      const data = {
        data: action.payload,
        key: uuidv1(),
      }
      state.comp = [...state.comp.filter((el) => el.data.type !== 'bun'), data]
    },
    burgerIngredientsDelete(state, action: PayloadAction<string>) {
      state.comp = [...state.comp.filter((el) => el.key !== action.payload)]
    },
    burgerIngredientsReset(state) {
      state.comp = []
    },
  },
})

export const {
  burgerIngredientsAdd,
  burgerCardAdd,
  burgerBunAdd,
  burgerIngredientsDelete,
  burgerIngredientsReset,
} = ComponentsSlice.actions

export default ComponentsSlice.reducer
