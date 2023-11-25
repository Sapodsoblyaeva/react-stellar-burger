import { combineReducers } from 'redux'
import { reducer as IngredientReducer } from './ingredients/reducer'
import { reducer as ConstructorReducer } from './constructor-ingredients/reducer'
import { reducer as cardReducer } from './ingredient-сard/reducer'
import { reducer as orderReducer } from './order-data/reducer'

export const reducer = combineReducers({
  ingredients: IngredientReducer,
  components: ConstructorReducer,
  card: cardReducer,
  orderNumber: orderReducer,
})
