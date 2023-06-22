'use client'
import { Button } from '@mui/material'
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
    <div className="mb-10 flex h-20 w-full items-center justify-center bg-emerald-600 py-5">
      <div className="flex w-full max-w-[1350px] items-center">
        <Button color="primary" onClick={handleOpenDrawer}>
          <MenuIcon fontSize="large" sx={{ color: '#FFF' }} />
        </Button>
      </div>
      <DrawerAside isOpen={isOpen} handleCloseDrawer={handleCloseDrawer} />
    </div>
  )
}

export default Header
