import React from 'react'
import { Box, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

import { IFTwoTextFieldsProps } from '@/@types/components/IFTwoTextFieldsTypes'

const FTwoTextFields = ({
  width,
  width2,
  name,
  name2,
  label,
  label2,
  rules,
  disabled = false,
  disabled2 = false,
  ...rest
}: IFTwoTextFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Box width="100%" display="flex" alignItems="center" gap={1}>
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
            sx={{ width }}
            label={label}
            variant="outlined"
            error={invalid}
            helperText={error?.message}
            inputRef={ref}
            {...inputProps}
            {...rest}
            disabled={disabled}
          />
        )}
      />
      <Controller
        name={name2}
        control={control}
        rules={rules}
        defaultValue=""
        render={({
          field: { ref, ...inputProps },
          fieldState: { invalid, error },
        }) => (
          <TextField
            sx={{ width: width2 }}
            label={label2}
            variant="outlined"
            error={invalid}
            helperText={error?.message}
            inputRef={ref}
            {...inputProps}
            {...rest}
            disabled={disabled2}
          />
        )}
      />
    </Box>
  )
}

export default FTwoTextFields
