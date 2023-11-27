import {
  BURGER_INGREDIENTS_ADD,
  BURGER_INGREDIENTS_DELETE,
  BURGER_ADD_BUN,
  BURGER_ADD_CARD,
} from './action'

const initialState = {
  components: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_ADD:
      return { ...state, components: [...state.components, action.payload] }
    case BURGER_ADD_CARD:
      return {
        ...state,
        components: [
          ...state.components.splice(action.hover, 0, action.payload),
          ...state.components,
        ],
      }
    case BURGER_ADD_BUN:
      return {
        ...state,
        components: [
          ...state.components.filter((el) => el.item.type !== 'bun'),
          action.payload,
        ],
      }
    case BURGER_INGREDIENTS_DELETE:
      return {
        ...state,
        components: state.components.filter(
          (component) => component.key !== action.payload
        ),
      }
    default:
      return state
  }
}
