import { addNewOrder } from '../../utils/constants'

export const ORDER_PROGRESS = 'ORDER_PROGRESS'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_ERROR = 'ORDER_ERROR'

export const loadOrder = (arr) => (dispatch) => {
  dispatch({ type: ORDER_PROGRESS })
  return addNewOrder(arr)
    .then(
      (res) => dispatch({ type: ORDER_SUCCESS, payload: res.order.number })
      // dispatch({ type: INGREDIENTS_LOAD_SUCCESS, payload: result.data })
    )
    .catch((error) => dispatch({ type: ORDER_ERROR, payload: error.message }))
}

// const orderNumberFromApi = () => {
//   let arr = []
//   components.length !== 0 &&
//     components.map((component) => {
//       arr.push(component.item._id)
//     })
//   addNewOrder(arr).then((result) => {
//     setOrderNumber(result.order.number)
//     openModal()
//   })
// }

// export const ADD_TASK = 'ADD_TASK'
// export const DELETE_TASK = 'DELETE_TASK'

// export const addTask = (text) => ({
//   type: ADD_TASK,
//   payload: { content: text, id: Math.random() },
// })

// export const deleteTask = (id) => ({
//   type: DELETE_TASK,
//   payload: id,
// })

// //запихнуть в диспатч добавления, улетит в миддлваре (обработается, благодаря миддлваре)
// export const logAddTask = (text) => {
//   return (dispatch) => {
//     console.log(`add ${text}`)
//     dispatch(addTask(text))
//   }
// }

//import {addTask as ADDtaskAPI} from api
//import {deleteTask as DELETEtaskAPI} from api
//import {getProjectTask as getProjectTasks} from api
// export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
// export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
// export const TASKS_LOAD_SUCCESS = 'TASKS_LOAD_SUCCESS'
// export const TASKS_LOADING = 'TASKS_LOADING'
// export const TASKS_ERROR = 'TASKS_ERROR'

// export const addTaskAPI = (text) => (dispatch) => {
//   return ADDtaskAPI(text).then((res) =>
//     dispatch({ type: ADD_TASK_SUCCESS, payload: res })
//   )
// }

// export const deleteTaskAPI = (id) => (dispatch) => {
//   return DELETEtaskAPI(id).then((res) =>
//     dispatch({ type: DELETE_TASK_SUCCESS, payload: id })
//   )
// }

// export const loadTasksAPI = () => (dispatch) => {
//   dispatch({ type: TASKS_LOADING })
//   return getProjectTasks()
//     .then((res) => dispatch({ type: TASKS_LOAD_SUCCESS, payload: res }))
//     .catch((error) => dispatch({ type: TASKS_ERROR, payload: error.message}))
// }

//В APP через useDispatch и useEffect задиспатчить loadTasks для первоначальной загрузки ингридиентов
//В APP нужно через useSelector вызвать loading, error, tasks и дописать код

// if (loading) {
//     return <h2>Loading..</h2>
// }

// if {!loading && error} {
//     return <h2>Something's gone wrong...</h2>
// }

//{...state/user, key: uuid()}
