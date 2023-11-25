import {
  INGREDIENTS_LOAD_ERROR,
  INGREDIENTS_LOAD_PROGRESS,
  INGREDIENTS_LOAD_SUCCESS,
} from './action'

const initialState = {
  ingredients: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_LOAD_PROGRESS: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case INGREDIENTS_LOAD_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
      }
    }
    case INGREDIENTS_LOAD_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}

// import { ADD_TASK, ADD_TASK_SUCCESS, DELETE_TASK } from './action'

// const initialState = {
//   tasks: [], //components,
// }

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TASKS_LOAD: {
//       return {
//         ...state,
//         error: null,
//         loading: true
//       }
//     }
//     case TASKS_ERROR: {
//       return {
//         ...state,
//         error: action.payload,
//         loading: false
//       }
//     }
//     case LOAD_TASK_SUCCESS: {
//       return {
//         ...state,
//         tasks: action.payload,
//         loading: false
//       }
//     }
//     case ADD_TASK || ADD_TASK_SUCCESS:
//       //state.tasks.push(action.payload) - нельзя не изменится адрес
//       return {
//         ...state, //описывает все поля, которые трогать нельзя
//         tasks: [...state.tasks, action.payload],
//       } //возвращаем новый объект с новым адресом (т/е/ сконструировали новый объект на основе старого с использованием спреад оператора)
//     case DELETE_TASK: {
//       return {
//         ...state,
//         tasks: state.tasks.filter((task) => task.id !== action.payload),
//       }
//     }
//     default:
//       return state
//   }
// }

const a = { p: 16 } //при замене значения на 17, адрес остается тот же
const b = { p: 16 }

// console.log(a === b) //false == так как сравниваются адреса

//для редакса нужно, чтобы изменился адрес
