import { Navigate } from 'react-router-dom'
import { Form } from '../components/form/form'
import { useEffect } from 'react'

export const NewPassword = () => {
  useEffect(() => {
    localStorage.removeItem('emailProvided')
  }, [])

  return localStorage.getItem('emailProvided') ? (
    <Form title='Восстановление пароля' question='Вспомнили пароль?' />
  ) : (
    <Navigate to='/login' />
  )
}
