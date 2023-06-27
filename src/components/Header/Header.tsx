'use client'
import React, { useState } from 'react'
import { Button } from '@mui/material'

import DrawerAside from '../Drawer/Drawer'
import Link from 'next/link'

import MenuIcon from '@mui/icons-material/Menu'

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
        <div className="flex items-center justify-center gap-3">
          <Button color="primary" onClick={handleOpenDrawer}>
            <MenuIcon fontSize="large" sx={{ color: '#FFF' }} />
          </Button>
          <Link
            href="/"
            className="font-ysabeau text-xl font-semibold text-zinc-50 no-underline hover:text-zinc-300 sm:text-2xl"
          >
            CarManager
          </Link>
        </div>
      </div>
      <DrawerAside isOpen={isOpen} handleCloseDrawer={handleCloseDrawer} />
    </div>
  )
}

export default Header
