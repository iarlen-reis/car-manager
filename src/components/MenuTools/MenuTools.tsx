import {
  Paper,
  Typography,
  Button,
  useTheme,
  Box,
  useMediaQuery,
  Skeleton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import React from 'react'

import { IMenuToolsProps } from '@/@types/components/IMenuToolsTypes'

const MenuTools = ({
  handleOpenModal,
  textButton,
  description,
  isLoading,
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
      paddingX={1}
      paddingY={1}
    >
      {!isLoading ? (
        <>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              color={theme.palette.secondary.dark}
              variant="body1"
              fontSize={isMedium ? '10px' : isSmall ? '13px' : '16px'}
              textAlign="center"
              className="font-poppins font-bold text-black"
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
          >
            <Typography
              variant="button"
              fontSize={isSmall ? '8px' : isMedium ? '13px' : '16px'}
            >
              {textButton}
            </Typography>
          </Button>
        </>
      ) : (
        <Box width="100%" height={theme.spacing(6)}>
          <Skeleton width="100%" height="100%" variant="rounded" />
        </Box>
      )}
    </Box>
  )
}

export default MenuTools
