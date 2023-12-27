import { useState } from 'react'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { resetPassword } from '../utils/constants'

import { Form } from '../components/form/form'

export const ForgotPassword = () => {

  // const navigate = useNavigate()

  // const [emailValue, setEmailValue] = useState('')
  // const onEmailChange = (e) => {
  //   setEmailValue(e.target.value)
  // }

  // const onResetClick = (e) => {
  //   e.preventDefault();
  //   resetPassword(emailValue)
  //   navigate("/reset-password")
  // }

  return (
    <Form
      title='Восстановление пароля'
      buttonName="Восстановить"
      question='Вспомнили пароль?'
    />
    // <div className={styles.form}>
    //   <div className={styles.form__container}>
    //     <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
    //     <div className={styles.form__input}>
    //       <EmailInput
    //         onChange={onEmailChange}
    //         value={emailValue}
    //         name={'email'}
    //         placeholder='Укажите E-mail'
    //         isIcon={false}
    //         extraClass='mb-2'
    //       />
    //     </div>
    //     <Button htmlType='button' type='primary' size='large' onClick={onResetClick}>
    //       Восстановить
    //     </Button>
    //     <p
    //       className={`${
    //         styles.form__register
    //       } ${'text text_type_main-default text_color_inactive'}`}
    //     >
    //       Вспомнили пароль?{' '}
    //       <NavLink to="/login" className={styles.form__accentlink}>Войти</NavLink>
    //     </p>
    //   </div>
    // </div>
  )
}
