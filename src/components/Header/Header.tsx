'use client'
import { Box, Container } from '@mui/material'
import { grey } from '@mui/material/colors'
import MenuIcon from '@mui/icons-material/Menu'

import React, { useState } from 'react'
import DrawerAside from '../Drawer/Drawer'

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }
  return (
    <Box
      component="div"
      height={80}
      sx={{
        backgroundColor: grey[800],
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <Box onClick={handleOpenDrawer} sx={{ width: 'fit-content' }}>
          <MenuIcon
            sx={{ cursor: 'pointer', color: grey[50], fontSize: '30px' }}
          />
        </Box>
        <img src="/logo.png" alt="" width={150} />
      </Container>
      <DrawerAside isOpen={isOpen} handleCloseDrawer={handleCloseDrawer} />
    </Box>
  )
}

export default Header
