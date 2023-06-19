import { TextFieldProps } from '@mui/material'

export type FTextFieldProps = {
  name: string
  label: string
  rules?: Object
} & Omit<TextFieldProps, 'name'>
