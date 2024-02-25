import styles from './form.module.css'
import { NavLink } from 'react-router-dom'
import Title from '../title/title'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-from'
import { ForgetPassForm } from './forget-pass-from'
import { ResetPassForm } from './reset-pass-from'

type Props = {
  title: string
  buttonName?: string
  question?: string
}

export const Form = (props: Props) => {
  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <Title type='h2' title={props.title} />
        {props.title === 'Вход' ? (
          <LoginForm />
        ) : props.title === 'Регистрация' ? (
          <RegisterForm />
        ) : props.title === 'Восстановление пароля' &&
          props.buttonName === 'Восстановить' ? (
          <ForgetPassForm buttonName='Восстановить' />
        ) : (
          props.title === 'Восстановление пароля' && <ResetPassForm />
        )}
      </div>
      {props.title !== 'Вход' && (
        <div>
          {' '}
          <p
            className={`${
              styles.form__register
            } ${'text text_type_main-default text_color_inactive'}`}
          >
            {props.question}{' '}
            <NavLink to='/login' className={styles.form__accentlink}>
              Войти
            </NavLink>
          </p>
        </div>
      )}
    </div>
  )
}
