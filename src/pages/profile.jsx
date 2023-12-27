import { useEffect, useRef, useState } from 'react'
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromServer, logout } from '../services/registration/action'
import { userCredentials } from '../services/registration/selector'
import { changeUser } from '../utils/constants'

export const Profile = () => {
  const [inputValue, setInputValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passValue, setPassValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserFromServer())
    setInputValue(localStorage.getItem('name'))
    setEmailValue(localStorage.getItem('email'))
  }, [])

  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onClick = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const onNameChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
    changeUser({ nameValue: e.target.value })
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__menu}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${'text text_type_main-medium'} ${
                  styles.profile__menulink_active
                }`
              : `${'text text_type_main-medium text_color_inactive'} ${
                  styles.profile__menulink
                }`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to='/orders'
          className={({ isActive }) =>
            isActive
              ? `${'text text_type_main-medium'} ${
                  styles.profile__menulink_active
                }`
              : `${'text text_type_main-medium text_color_inactive'} ${
                  styles.profile__menulink
                }`
          }
        >
          История Заказов
        </NavLink>
        <NavLink
          to='/login'
          className={({ isActive }) =>
            isActive
              ? `${'text text_type_main-medium'} ${
                  styles.profile__menulink_active
                }`
              : `${'text text_type_main-medium text_color_inactive'} ${
                  styles.profile__menulink
                }`
          }
          onClick={onClick}
        >
          Выход
        </NavLink>
        <p
          className={`${styles.profile__description} ${
            styles.profile__menulink
          }${'text text_type_main-small text_color_inactive'}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.profile__input}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onNameChange}
          value={inputValue}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1'
          icon={'EditIcon'}
        />
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          placeholder='E-mail'
          isIcon={false}
          icon={'EditIcon'}
        />
        <PasswordInput
          onChange={(e) => setPassValue(e.target.value)}
          value={passValue}
          name={'password'}
          icon='EditIcon'
        />
      </div>
    </div>
  )
}
