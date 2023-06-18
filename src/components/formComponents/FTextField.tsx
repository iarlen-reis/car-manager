import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type FTextFieldProps = {
  name: string
  label: string
  rules?: Object
} & Omit<TextFieldProps, 'name'>

const FTextField: React.FC<FTextFieldProps> = ({
  name,
  label,
  rules,
  ...rest
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({
        field: { ref, ...inputProps },
        fieldState: { invalid, error },
      }) => (
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          error={invalid}
          helperText={error?.message}
          inputRef={ref}
          {...inputProps}
          {...rest}
        />
      )}
    />
  )
}

export default FTextField
