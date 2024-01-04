import { useEffect, useRef, useState } from 'react'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserFromServer, logout } from '../services/registration/action'
import { changeUser } from '../utils/api'

export const Profile = () => {
  const initialState = sessionStorage.getItem('pass')
  const [inputValue, setInputValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passValue, setPassValue] = useState(initialState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserFromServer())
    setInputValue(localStorage.getItem('name'))
    setEmailValue(localStorage.getItem('email'))
  }, [])

  const [iconClicked, setIconClicked] = useState(false)

  const inputRef = useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setIconClicked(true)
  }

  const onClick = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const onNameChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const onPassChange = (e) => {
    e.preventDefault()
    setIconClicked(true)
    setPassValue(e.target.value)
  }

  const onSaveClicked = (e) => {
    e.preventDefault()
    changeUser({ nameValue: inputValue, passwordValue: passValue }).then(() => {
      localStorage.setItem('name', inputValue)
      setIconClicked(false)
    })
    .catch((err) => console.log(err))
  }

  const onCancelClick = (e) => {
    e.preventDefault()
    setInputValue(localStorage.getItem('name'))
    setPassValue(initialState)
    setIconClicked(false)
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
      <form className={styles.profile__input} onSubmit={onSaveClicked}>
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
        />
        <PasswordInput
          onChange={onPassChange}
          value={passValue}
          name={'password'}
          icon='EditIcon'
        />
        {iconClicked && (
          <div className={styles.profile__buttons}>
            <Button htmlType='submit' type='primary' size='medium'>
              Сохранить
            </Button>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
              onClick={onCancelClick}
            >
              Отменить
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
