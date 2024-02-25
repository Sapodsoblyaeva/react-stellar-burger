import { FormEvent, useRef } from 'react'
import {
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { successResetPassword } from '../../utils/api'
import { useForm } from '../../hooks/useForm'

export const ResetPassForm = () => {
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

  const onResetClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    successResetPassword(values.pass).catch((err) => console.log(err))
  }

  return (
    <form className={styles.form__input} onSubmit={onResetClick}>
      <PasswordInput
        onChange={handleChange}
        value={values.pass}
        name={'pass'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
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
      <Button htmlType='submit' type='primary' size='large'>
        Сохранить
      </Button>
    </form>
  )
}
