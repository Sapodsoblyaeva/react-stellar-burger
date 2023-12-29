import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { userCredentials } from '../../services/registration/selector'

const Protected = ({ onlyUnAuth = false, component }) => {
  const { user } = useSelector(userCredentials)
  const { isAuthChecked } = useSelector(userCredentials)
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

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element,
}

export const OnlyAuth = Protected

export const OnlyUnAuth = ({ component }) => {
  return <Protected onlyUnAuth={true} component={component} />
}
