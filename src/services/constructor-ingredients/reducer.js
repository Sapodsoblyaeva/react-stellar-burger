import { BURGER_INGREDIENTS_ADD, BURGER_INGREDIENTS_DELETE } from './action'

const initialState = {
  components: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_ADD:
    //   console.log(action.payload.item)
      return { ...state, components: [...state.components, action.payload] }
    case BURGER_INGREDIENTS_DELETE:
      return {
        ...state,
        components: state.components.filter(
          (component) => component._id !== action.payload
        ),
      }
    default:
      return state
  }
}

// import { AUTH_REQUEST_SUCCESS } from './action'

// const initialState = {
//   user: null,
// }

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUTH_REQUEST_SUCCESS:
//       //state.tasks.push(action.payload) - нельзя не изменится адрес
//       return {
//         ...state, //описывает все поля, которые трогать нельзя
//         user: action.payload,
//       } //возвращаем новый объект с новым адресом (т/е/ сконструировали новый объект на основе старого с использованием спреад оператора)
//     default:
//       return state
//   }
// }

const a = { p: 16 } //при замене значения на 17, адрес остается тот же
const b = { p: 16 }

// console.log(a === b) //false == так как сравниваются адреса

//для редакса нужно, чтобы изменился адрес
