import React from 'react'
import { TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

import { FTextFieldProps } from '@/@types/components/IFTextFieldTypes'

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
