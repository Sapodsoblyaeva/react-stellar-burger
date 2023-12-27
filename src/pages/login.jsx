import { useRef, useState } from 'react'
import {
  EmailInput,
  Button,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { Form } from '../components/form/form'
import { loginUser } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAfterLogin, getUserFromServer, login } from '../services/registration/action'
import { userId } from '../services/registration/selector'

export const Login = () => {
//   const [passValue, setPassValue] = useState('')
//   const [emailValue, setEmailValue] = useState('')

// const dispatch = useDispatch()

// const navigate = useNavigate()


//   const onEmailChange = (e) => {
//     setEmailValue(e.target.value)
//   }

//   const onPassChange = (e) => {
//     setPassValue(e.target.value)
//   }

//   const inputRef = useRef(null)

//   const onIconClick = () => {
//     setTimeout(() => inputRef.current.focus(), 0)
//     alert('Icon Click Callback')
//   }

//   const onClick = (e) => {
//     e.preventDefault()
//     dispatch(login(emailValue, passValue))
//     navigate("/")
//   }

  return (
    <Form
      title='Вход'
      // buttonName='Войти'
    />
    // <div className={styles.form}>
    //   <div className={styles.form__container}>
    //     <h1 className='text text_type_main-medium'>Вход</h1>
    //     <div className={styles.form__input}>
    //       <EmailInput
    //         onChange={onEmailChange}
    //         value={emailValue}
    //         name={'email'}
    //         placeholder='E-mail'
    //         isIcon={false}
    //         extraClass='mb-2'
    //       />
    //       <PasswordInput value={passValue} name={'password'} onChange={onPassChange}/>
    //     </div>
    //     <Button htmlType='button' type='primary' size='medium' onClick={onClick}>
    //       Войти
    //     </Button>
    //     <p
    //       className={`${
    //         styles.form__register
    //       } ${'text text_type_main-default text_color_inactive'}`}
    //     >
    //       Вы — новый пользователь?{' '}
    //       <NavLink to="/register" className={styles.form__accentlink}>Зарегистрироваться</NavLink>
    //     </p>
    //     <p
    //       className={`${
    //         styles.form__forgotpass
    //       } ${'text text_type_main-default text_color_inactive'}`}
    //     >
    //       Забыли пароль?{' '}
    //       <NavLink to="/forgot-password" className={styles.form__accentlink}>Восстановить пароль</NavLink>
    //     </p>
    //   </div>
    // </div>
  )
}
