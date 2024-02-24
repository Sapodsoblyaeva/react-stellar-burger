import { ChangeEvent, useState } from 'react'

export type inputValues = {
  input: string
  email: string
  pass: string
}

export function useForm(inputValues: inputValues) {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLButtonElement
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}
