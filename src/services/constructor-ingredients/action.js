import { v1 as uuidv1 } from 'uuid'

export const BURGER_INGREDIENTS_ADD = 'BURGER_INGREDIENTS_ADD'
export const BURGER_INGREDIENTS_DELETE = 'BURGER_INGREDIENTS_DELETE'
export const BURGER_ADD_BUN = 'BURGER_ADD_BUN'
export const BURGER_ADD_CARD = 'BURGER_ADD_CARD'

export const addIngredient = (item) => ({
  type: BURGER_INGREDIENTS_ADD,
  payload: { item, key: uuidv1() },
})

export const deleteIngredient = (id) => ({
  type: BURGER_INGREDIENTS_DELETE,
  payload: id,
})

export const addBun = (item) => ({
  type: BURGER_ADD_BUN,
  payload: { item, key: uuidv1() },
})

export const createCardNewPlace = (item, hoverIndex) => ({
  type: BURGER_ADD_CARD,
  payload: { item, key: uuidv1() },
  hover: hoverIndex,
})
