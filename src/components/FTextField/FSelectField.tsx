import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FSelectFieldProps } from '@/@types/components/IFSelectorFieldTypes'

const FSelectField = ({
  name,
  label,
  options,
  disabled,
  required,
  rules,
}: FSelectFieldProps) => {
  const { control } = useFormContext()

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field, fieldState: { invalid, error } }) => (
          <Select
            labelId={`${name}-label`}
            label={label}
            {...field}
            disabled={disabled}
            required={required}
            error={invalid}
          >
            <MenuItem value="">Selecionar</MenuItem>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.nome ? option.nome : option.placa}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default FSelectField
