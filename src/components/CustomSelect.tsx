import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import { ChangeEvents } from "../hooks/useForm";

interface OptionItem {
  key: string
  value: string
}

interface CustomSelectProps {
  name: string
  label?: string
  required?: boolean
  fullWidth?: boolean
  disabled?: boolean
  value: string
  onChange: (event: ChangeEvents) => void
  options: OptionItem[]
  errorMessage: string
}

const StyledErrorMessage = styled('p')(({ theme }) => ({
  margin: '0px',
  color: 'red'
}))

export default function CustomSelect({ name, label = name, required = false, fullWidth = true, disabled = false, value, onChange, options, errorMessage }: CustomSelectProps) {
  return (
    <FormControl fullWidth sx={{ marginBottom: 3 }}>
      <InputLabel id={`${name}-select`}>Marca</InputLabel>
      <Select
        labelId={`${name}-select`}
        id={name}
        name={name}
        label={label}
        margin="none"
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
      >
        {options?.map((element) => (
          <MenuItem value={element.key} key={element.key}>
            {element.value}
          </MenuItem>
        ))}
      </Select>
      <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
    </FormControl>
  )
}