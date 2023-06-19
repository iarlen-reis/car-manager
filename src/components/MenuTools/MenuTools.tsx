import {
  Paper,
  Typography,
  Button,
  useTheme,
  Box,
  useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import React from 'react'

import { IMenuToolsProps } from '@/@types/components/IMenuToolsTypes'

const MenuTools = ({
  handleOpenModal,
  textButton,
  description,
}: IMenuToolsProps) => {
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component={Paper}
      width="100%"
      height={theme.spacing(7)}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX={2}
      paddingY={1}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography
          color={theme.palette.secondary.dark}
          variant="button"
          fontSize={isMedium ? '10px' : isSmall ? '13px' : '16px'}
          textAlign="center"
        >
          {description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
        sx={{
          color: theme.palette.primary.light,
        }}
      >
        <Typography
          variant="button"
          color={theme.palette.primary.light}
          fontSize={isSmall ? '8px' : isMedium ? '13px' : '16px'}
        >
          {textButton}
        </Typography>
      </Button>
    </Box>
  )
}

export default MenuTools
