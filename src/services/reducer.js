import { combineReducers } from 'redux'
import { reducer as IngredientReducer } from './ingredients/reducer'
import { reducer as ConstructorReducer } from './constructor-ingredients/reducer'
import { reducer as CardReducer } from './ingredient-сard/reducer'
import { reducer as OrderReducer } from './order-data/reducer'

export const reducer = combineReducers({
  ingredients: IngredientReducer,
  components: ConstructorReducer,
  card: CardReducer,
  orderNumber: OrderReducer,
})
