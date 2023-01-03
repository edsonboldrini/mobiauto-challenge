import { useState } from "react"

export {
  useForm
}

interface UseFormProps {
  initialValues: { [key: string]: any }
  onSubmit: (values: { [key: string]: any }) => {}
  validate: (values: { [key: string]: any }) => {}
}

export interface ChangeEvents {
  target: {
    name: string
    value: any
    checked?: boolean
  }
}

function useForm({ initialValues, onSubmit, validate }: UseFormProps) {
  const [values, setValues] = useState<{ [key: string]: any }>(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: any }>({})

  const updateKeyValue = (key: string, value: any) => {
    setValues((previousValues) => { return { ...previousValues, [key]: value } })
  }

  function handleChange(event: ChangeEvents) {
    setValues((previousValues) => {
      return {
        ...previousValues,
        [event.target.name]: event.target.checked != undefined ? event.target.checked : event.target.value
      }
    })
  }

  function clearForm() {
    setValues(initialValues)
    clearErrors()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errorsResponse = validate?.(values)
    setErrors(errorsResponse)
    if (Object.keys(errorsResponse).length == 0) {
      onSubmit?.(values);
    }
  }

  function clearErrors() {
    setErrors({})
  }

  return {
    values,
    updateKeyValue,
    handleChange,
    clearForm,
    handleSubmit,
    errors,
    clearErrors,
  }
}