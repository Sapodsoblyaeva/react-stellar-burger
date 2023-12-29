import { useRef, useState } from 'react'
import {
  EmailInput,
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Title from '../title/title'
import { useDispatch } from 'react-redux'
import { login, register } from '../../services/registration/action'
import { resetPassword, successResetPassword } from '../../utils/api'
import PropTypes from 'prop-types'

export const Form = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [passValue, setPassValue] = useState('')
  const [emailValue, setEmailValue] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onEmailChange = (e) => {
    setEmailValue(e.target.value)
  }

  const onPassChange = (e) => {
    setPassValue(e.target.value)
  }

  const inputRef = useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onLoginClick = (e) => {
    e.preventDefault()
    dispatch(login(emailValue, passValue))
  }

  const onRegisterClick = (e) => {
    e.preventDefault()
    dispatch(register(emailValue, passValue, inputValue))
  }

  const onForgetClick = (e) => {
    e.preventDefault()
    resetPassword(emailValue).then((res) => {
      localStorage.setItem('emailProvided', res.success)
      navigate('/reset-password')
    })
    .catch((err) => console.log(err))
  }

  const onResetClick = (e) => {
    e.preventDefault()
    successResetPassword(passValue)
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <Title type='h2' title={props.title} />
        {props.title === 'Вход' ? (
          <form className={styles.form__input} onSubmit={onLoginClick}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              placeholder='E-mail'
              isIcon={false}
              extraClass='mb-2'
            />
            <PasswordInput
              value={passValue}
              name={'password'}
              onChange={onPassChange}
            />
            <Button htmlType='submit' type='primary' size='medium'>
              Войти
            </Button>
          </form>
        ) : props.title === 'Регистрация' ? (
          <form className={styles.form__input} onSubmit={onRegisterClick}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass='ml-1'
            />
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              placeholder='E-mail'
              isIcon={false}
              extraClass='mb-2'
            />
            <PasswordInput
              onChange={onPassChange}
              value={passValue}
              name={'password'}
            />
            <Button htmlType='submit' type='primary' size='large'>
              Зарегистрироваться
            </Button>
          </form>
        ) : props.title === 'Восстановление пароля' &&
          props.buttonName === 'Восстановить' ? (
          <form className={styles.form__input} onSubmit={onForgetClick}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              placeholder='Укажите E-mail'
              isIcon={false}
              extraClass='mb-2'
            />
            <Button htmlType='submit' type='primary' size='large'>
              {props.buttonName}
            </Button>
          </form>
        ) : (
          props.title === 'Восстановление пароля' && (
            <form className={styles.form__input} onSubmit={onResetClick}>
              <PasswordInput
                onChange={onPassChange}
                value={passValue}
                name={'password'}
              />
              <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='ml-1'
              />
              <Button htmlType='submit' type='primary' size='large'>
                Сохранить
              </Button>
            </form>
          )
        )}
      </div>
      {props.title === 'Вход' ? (
        <>
          {' '}
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
      ) : (
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

Form.propTypes = {
  props: PropTypes.string,
}
