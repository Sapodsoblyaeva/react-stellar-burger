import { combineReducers } from 'redux'
import { reducer as IngredientReducer } from './ingredients/reducer'
import { reducer as ConstructorReducer } from './constructor-ingredients/reducer'
import { reducer as CardReducer } from './ingredient-сard/reducer'
import { reducer as OrderReducer } from './order-data/reducer'
import { reducer as UserReducer } from './registration/reducer'
import { reducer as FeedReducer } from './feed/reducer'
import { reducer as ProfileOrderReducer } from './profile-orders/reducer'

export const reducer = combineReducers({
  ingredients: IngredientReducer,
  components: ConstructorReducer,
  card: CardReducer,
  orderNumber: OrderReducer,
  user: UserReducer,
  feed: FeedReducer,
  profileOrder: ProfileOrderReducer,
})
