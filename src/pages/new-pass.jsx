import { useRef, useState } from 'react'
import {
  Input,
  Button,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { Link, NavLink } from 'react-router-dom'
import { successResetPassword } from '../utils/constants'

import { Form } from '../components/form/form'

export const NewPassword = () => {
  
  // const [inputValue, setInputValue] = useState('')
  // const [passValue, setPassValue] = useState('')

  // const inputRef = useRef(null)

  // const onIconClick = () => {
  //   setTimeout(() => inputRef.current.focus(), 0)
  //   alert('Icon Click Callback')
  // }

  // const onResetClick = (e) => {
  //   e.preventDefault();
  //   successResetPassword(passValue)
  // }

  // const onPassChange = (e) => {
  //   setPassValue(e.target.value)
  // }

  return (
    <Form
      title='Восстановление пароля'
      // buttonName='Сохранить'
      // link='Войти'
      question='Вспомнили пароль?'
    />
    // <div className={styles.form}>
    //   <div className={styles.form__container}>
    //     <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
    //     <div className={styles.form__input}>
    //     <PasswordInput
    //         onChange={onPassChange}
    //         value={passValue}
    //         name={'password'}
    //       />
    //       <Input
    //         type={'text'}
    //         placeholder={'Введите код из письма'}
    //         onChange={(e) => setInputValue(e.target.value)}
    //         value={inputValue}
    //         name={'name'}
    //         error={false}
    //         ref={inputRef}
    //         onIconClick={onIconClick}
    //         errorText={'Ошибка'}
    //         size={'default'}
    //         extraClass='ml-1'
    //       />
    //     </div>
    //     <Button htmlType='button' type='primary' size='large' onClick={onResetClick}>
    //       Сохранить
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
