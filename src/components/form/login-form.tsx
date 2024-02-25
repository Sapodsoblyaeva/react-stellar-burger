import { FormEvent } from 'react'
import {
  EmailInput,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { useAppDispatch } from '../../hooks/useDispatch'
import { login } from '../../services/registration/action'
import { useForm } from '../../hooks/useForm'
import { NavLink } from 'react-router-dom'

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const { values, handleChange } = useForm({
    input: '',
    email: '',
    pass: '',
  })

  const onLoginClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ email: values.email, pass: values.pass }))
  }

  return (
    <>
      <form className={styles.form__input} onSubmit={onLoginClick}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder='E-mail'
          isIcon={false}
          extraClass='mb-2'
        />
        <PasswordInput
          value={values.pass}
          name={'pass'}
          onChange={handleChange}
        />
        <Button htmlType='submit' type='primary' size='medium'>
          Войти
        </Button>
      </form>{' '}
      <p
        className={`${
          styles.form__register
        } ${'text text_type_main-default text_color_inactive'}`}
      >
        Вы — новый пользователь?{' '}
        <NavLink to='/register' className={styles.form__accentlink}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p
        className={`${
          styles.form__forgotpass
        } ${'text text_type_main-default text_color_inactive'}`}
      >
        Забыли пароль?{' '}
        <NavLink to='/forgot-password' className={styles.form__accentlink}>
          Восстановить пароль
        </NavLink>
      </p>{' '}
    </>
  )
}
