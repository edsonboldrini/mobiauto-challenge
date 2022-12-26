import { SelectChangeEvent } from "@mui/material/Select"
import { useState } from "react"

export {
  useForm
}

interface UseFormProps {
  initialValues: { [key: string]: any }
  onSubmit: (values: { [key: string]: any }) => {}
  validate: (values: { [key: string]: any }) => {}
}

interface ChangeEvents {
  target: {
    name: string
    value: any
  }
}

function useForm({ initialValues, onSubmit, validate }: UseFormProps) {
  const [values, setValues] = useState<{ [key: string]: any }>(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: any }>({})

  function handleChange(event: ChangeEvents) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function clearForm() {
    setValues(initialValues)
    setErrors({})
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
    handleChange,
    clearForm,
    handleSubmit,
    errors,
    clearErrors,
  }
}