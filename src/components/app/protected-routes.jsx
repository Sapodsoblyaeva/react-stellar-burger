import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { userId, userAuthChecked } from '../../services/registration/selector'
import { loadIngredients } from '../../services/ingredients/action'
import { getUserFromServer } from '../../services/registration/action'
import { useEffect } from 'react'

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.user.user)
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked)
  const location = useLocation()

  if (!isAuthChecked) {
    return null
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return component
}

export const OnlyAuth = Protected

export const OnlyUnAuth = ({ component }) => {
  return <Protected onlyUnAuth={true} component={component} />
}