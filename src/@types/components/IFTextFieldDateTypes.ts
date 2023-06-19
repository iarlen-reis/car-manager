import { TextFieldProps } from '@mui/material'

export type FTextFieldDateProps = {
  name: string
  rules?: Object
} & Omit<TextFieldProps, 'name'>
