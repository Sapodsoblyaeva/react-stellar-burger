import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import { changeUser } from '../utils/api'
import { ProfileMenu } from '../components/profile-menu/profile-menu'
import { useAppDispatch } from '../hooks/useDispatch'

export const Profile = () => {
  const initialState: string = '******'
  const [inputValue, setInputValue] = useState<string | null>('')
  const [emailValue, setEmailValue] = useState<string | null>('')
  const [passValue, setPassValue] = useState<string | null>(initialState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setInputValue(localStorage.getItem('name'))
    setEmailValue(localStorage.getItem('email'))
  }, [dispatch])

  const [iconClicked, setIconClicked] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
    setIconClicked(true)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    setInputValue(target.value)
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    setEmailValue(target.value)
  }

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    setIconClicked(true)
    setPassValue(target.value)
  }

  const onSaveClicked = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputValue && passValue) {
      changeUser({ name: inputValue, pass: passValue })
        .then(() => {
          if (inputValue) {
            localStorage.setItem('name', inputValue)
            setIconClicked(false)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const onCancelClick = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    setInputValue(localStorage.getItem('name'))
    setPassValue(initialState)
    setIconClicked(false)
  }

  const location = useLocation()

  const [activeLocation, setActiveLocation] = useState<string>('/profile')

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
              value={inputValue ? inputValue : ''}
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
              onChange={onEmailChange}
              value={emailValue ? emailValue : ''}
              name={'email'}
              placeholder='E-mail'
              isIcon={false}
            />
            <PasswordInput
              onChange={onPassChange}
              value={passValue ? passValue : ''}
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
