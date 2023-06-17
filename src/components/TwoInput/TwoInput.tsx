import { Box, TextField, useTheme } from '@mui/material'

interface ITwoInputProps {
  idTextOne: string
  idTextTwo: string
  labelTextOne: string
  labelTextTwo: string
  widthField?: string
  setTextOne: (value: string) => void
  setTextTwo: (value: string) => void
}

export const TwoInput = ({
  idTextOne,
  idTextTwo,
  labelTextOne,
  labelTextTwo,
  setTextOne,
  setTextTwo,
  widthField,
}: ITwoInputProps) => {
  const theme = useTheme()
  return (
    <Box display="flex" width="100%" gap={1}>
      <TextField
        id={idTextOne}
        label={labelTextOne}
        variant="outlined"
        onBlur={(event) => setTextOne(event.target.value as string)}
        sx={{
          width: widthField || '100%',
        }}
        required
      />
      <TextField
        id={idTextTwo}
        label={labelTextTwo}
        variant="outlined"
        onBlur={(event) => setTextTwo(event.target.value as string)}
        sx={{
          width: widthField || theme.spacing(15),
        }}
        required
      />
    </Box>
  )
}
