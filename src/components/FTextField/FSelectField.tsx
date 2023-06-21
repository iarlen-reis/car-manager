import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface Option {
  id: string | number
  nome?: string
  placa?: string
}

interface FSelectFieldProps
  extends Omit<React.ComponentProps<typeof Select>, 'name'> {
  name: string
  label: string
  rules?: Object
  options: Option[] | []
}

const FSelectField = ({
  name,
  label,
  options,
  disabled,
}: FSelectFieldProps) => {
  const { control } = useFormContext()

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            label={label}
            {...field}
            disabled={disabled}
          >
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
