import { TextFieldProps } from '@mui/material'

export type IFTwoTextFieldsProps = {
  width: string
  width2: string
  name: string
  name2: string
  label: string
  label2: string
  rules?: Object
  disabled?: boolean
  disabled2?: boolean
} & Omit<TextFieldProps, 'name'>
