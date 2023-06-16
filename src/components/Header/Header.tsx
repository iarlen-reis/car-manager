'use client'
import { Box, Button } from '@mui/material'
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
    <Box width="100%" display="flex" alignItems="center" height={80}>
      <Box
        width="100%"
        maxWidth={1470}
        display="flex"
        alignItems="center"
        margin="0 auto"
        gap={2}
      >
        <Button color="primary" onClick={handleOpenDrawer}>
          <MenuIcon fontSize="large" color="secondary" />
        </Button>
      </Box>
      <DrawerAside isOpen={isOpen} handleCloseDrawer={handleCloseDrawer} />
    </Box>
  )
}

export default Header
