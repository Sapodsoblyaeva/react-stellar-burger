import { useEffect, useRef, useState } from 'react'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserFromServer } from '../services/registration/action'
import { changeUser } from '../utils/api'
import { ProfileMenu } from '../components/profile-menu/profile-menu'

export const Profile = () => {
  const initialState = sessionStorage.getItem('pass') === null ? "******" : sessionStorage.getItem('pass')
  const [inputValue, setInputValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passValue, setPassValue] = useState(initialState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserFromServer())
    setInputValue(localStorage.getItem('name'))
    setEmailValue(localStorage.getItem('email'))
  }, [dispatch])

  const [iconClicked, setIconClicked] = useState(false)

  const inputRef = useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setIconClicked(true)
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
    changeUser({ nameValue: inputValue, passwordValue: passValue })
      .then(() => {
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

  const location = useLocation()

  const [activeLocation, setActiveLocation] = useState('/profile')

  useEffect(() => {
    setActiveLocation(location.pathname)
  }, [location])

  return (
    <>
      {activeLocation === '/profile' ? (
        <div className={styles.profile}>
          <ProfileMenu />
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
      ) : (
        <div className={styles.history}>
          <ProfileMenu />
          <Outlet />
        </div>
      )}
    </>
  )
}
