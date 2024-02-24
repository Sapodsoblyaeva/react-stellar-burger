import { FormEvent, useRef } from 'react'
import {
  EmailInput,
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { useAppDispatch } from '../../hooks/useDispatch'
import { register } from '../../services/registration/action'
import { useForm } from '../../hooks/useForm'

export const RegisterForm = () => {
  const dispatch = useAppDispatch()

  const { values, handleChange } = useForm({
    input: '',
    email: '',
    pass: '',
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const onIconClick = () => {
    setTimeout(
      () =>
        inputRef.current === null ? '' : inputRef.current.focus() === null,
      0
    )
    alert('Icon Click Callback')
  }

  const onRegisterClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      register({ email: values.email, pass: values.pass, name: values.input })
    )
  }

  return (
    <form className={styles.form__input} onSubmit={onRegisterClick}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.input}
        name={'input'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder='E-mail'
        isIcon={false}
        extraClass='mb-2'
      />
      <PasswordInput
        onChange={handleChange}
        value={values.pass}
        name={'pass'}
      />
      <Button htmlType='submit' type='primary' size='large'>
        Зарегистрироваться
      </Button>
    </form>
  )
}
