import React from 'react'
import {
  Typography,
  Button,
  useTheme,
  Box,
  useMediaQuery,
  Skeleton,
} from '@mui/material'

import { IMenuToolsProps } from '@/@types/components/IMenuToolsTypes'

import Link from 'next/link'

import AddIcon from '@mui/icons-material/Add'

const MenuTools = ({
  handleOpenModal,
  textButton,
  isLoading,
  pagePath,
}: IMenuToolsProps) => {
  const theme = useTheme()

  const isSuperSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      width="100%"
      height={theme.spacing(7)}
      display="flex"
      alignItems={isSmall ? 'stretch' : 'center'}
      justifyContent="space-between"
      flexDirection={isSmall ? 'column' : 'row'}
      gap={2}
      padding={1}
    >
      {!isLoading ? (
        <>
          <Box display="flex" alignItems="center" gap={1}>
            <Link
              href="/"
              className="text-xs text-black no-underline transition-all hover:text-emerald-400 sm:text-sm lg:text-base"
            >
              Página inicial
            </Link>
            <span className="text-sm text-black">{'>'}</span>
            <Link
              href={`/${pagePath}`}
              className="text-xs font-semibold text-black no-underline sm:text-sm lg:text-base"
            >
              {pagePath}
            </Link>
          </Box>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              display: 'flex',
              alignSelf: 'end',
            }}
          >
            <Typography
              variant="button"
              fontSize={
                isSuperSmall
                  ? '10px'
                  : isSmall
                  ? '12px'
                  : isMedium
                  ? '14px'
                  : '18px'
              }
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
