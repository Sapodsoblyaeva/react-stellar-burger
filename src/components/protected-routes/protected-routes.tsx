import { Navigate, useLocation } from 'react-router-dom'
import { userCredentials } from '../../services/registration/selector'
import { useAppSelector } from '../../hooks/useSelector'

export type ProtectedRoureProps = {
  onlyUnAuth: boolean
  component: JSX.Element
}

const Protected = ({ onlyUnAuth = false, component }: ProtectedRoureProps) => {
  const { user, isAuthChecked } = useAppSelector(userCredentials)

  const { name, email } = user

  const location = useLocation()

  if (!isAuthChecked) {
    return null
  }

  if (onlyUnAuth && name !== '' && email !== '') {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && (name === '' || email === '')) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return component
}

export const OnlyAuth = Protected

export const OnlyUnAuth = ({ component, onlyUnAuth }: ProtectedRoureProps) => {
  return <Protected onlyUnAuth={onlyUnAuth} component={component} />
}
