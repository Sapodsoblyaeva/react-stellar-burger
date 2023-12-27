import { useRef, useState } from 'react'
import {
  EmailInput,
  Input,
  Button,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../services/registration/action'
import { Form } from '../components/form/form'

export const Register = () => {
  // const [inputValue, setInputValue] = useState('')
  // const [emailValue, setEmailValue] = useState('')
  // const [passValue, setPassValue] = useState('')

  // const dispatch =  useDispatch()

  // const  navigate =  useNavigate()

  // const onEmailChange = (e) => {
  //   setEmailValue(e.target.value)
  // }

  // const onPassChange = (e) => {
  //   setPassValue(e.target.value)
  // }

  // const inputRef = useRef(null)

  // const onIconClick = () => {
  //   setTimeout(() => inputRef.current.focus(), 0)
  //   alert('Icon Click Callback')
  // }

  // const onRegisterClick = (e) => {
  //   e.preventDefault()
  //   dispatch(register(emailValue, passValue, inputValue))
  //   navigate("/")
  // }

  return (
    <Form
      title='Регистрация'
      question="Уже зарегистрированы?"
    />
    // <div className={styles.form}>
    //   <div className={styles.form__container}>
    //     <h1 className='text text_type_main-medium'>Регистрация</h1>
    //     <div className={styles.form__input}>
    //       <Input
    //         type={'text'}
    //         placeholder={'Имя'}
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
    //       <EmailInput
    //         onChange={onEmailChange}
    //         value={emailValue}
    //         name={'email'}
    //         placeholder='E-mail'
    //         isIcon={false}
    //         extraClass='mb-2'
    //       />
    //       <PasswordInput
    //         onChange={onPassChange}
    //         value={passValue}
    //         name={'password'}
    //       />
    //     </div>
    //     <Button htmlType='button' type='primary' size='large' onClick={onRegisterClick}>
    //       Зарегистрироваться
    //     </Button>
    //     <p
    //       className={`${
    //         styles.form__register
    //       } ${'text text_type_main-default text_color_inactive'}`}
    //     >
    //       Уже зарегистрированы?{' '}
    //       <NavLink to="/login" className={styles.form__accentlink}>Войти</NavLink>
    //     </p>
    //   </div>
    // </div>
  )
}
