import React from 'react'
import { TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

import { FTextFieldDateProps } from '@/@types/components/IFTextFieldDate'

const FTextFieldDate: React.FC<FTextFieldDateProps> = ({
  name,
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
          type="date"
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

export default FTextFieldDate
