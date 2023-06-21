import { Select } from '@mui/material'
import { ComponentProps } from 'react'

export interface OptionProps {
  id: string | number
  nome?: string
  placa?: string
}

export interface FSelectFieldProps
  extends Omit<ComponentProps<typeof Select>, 'name'> {
  name: string
  label: string
  rules?: Object
  options: OptionProps[] | []
}
