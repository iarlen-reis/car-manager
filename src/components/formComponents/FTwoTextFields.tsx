import React from 'react'
import { Box, TextField, TextFieldProps } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type IFTwoTextFields = {
  width: string
  width2: string
  name: string
  name2: string
  label: string
  label2: string
  rules?: Object
} & Omit<TextFieldProps, 'name'>

const FTwoTextFields = ({
  width,
  width2,
  name,
  name2,
  label,
  label2,
  rules,
  ...rest
}: IFTwoTextFields) => {
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
          />
        )}
      />
    </Box>
  )
}

export default FTwoTextFields
