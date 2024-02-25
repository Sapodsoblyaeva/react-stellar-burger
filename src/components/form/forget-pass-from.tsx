import { FormEvent } from 'react'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './form.module.css'
import { useNavigate } from 'react-router-dom'
import { RefreshResponse, resetPassword } from '../../utils/api'
import { useForm } from '../../hooks/useForm'

type Props = {
  buttonName: string
}

export const ForgetPassForm = (props: Props) => {
  const navigate = useNavigate()

  const { values, handleChange, setValues } = useForm({
    input: '',
    email: '',
    pass: '',
  })

  const onForgetClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPassword(values.email)
      .then((res: unknown) => {
        const resConfirmed = res as RefreshResponse
        localStorage.setItem('emailProvided', resConfirmed.success.toString())
        navigate('/reset-password')
      })
      .catch((err) => console.log(err))
  }

  return (
    <form className={styles.form__input} onSubmit={onForgetClick}>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder='Укажите E-mail'
        isIcon={false}
        extraClass='mb-2'
      />
      <Button htmlType='submit' type='primary' size='large'>
        {props.buttonName}
      </Button>
    </form>
  )
}
