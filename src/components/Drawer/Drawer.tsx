'use client'
import React from 'react'
import { Drawer, List, useTheme, Box, Avatar, Divider } from '@mui/material'

import { DrawerProps } from '@/@types/components/IDrawerTypes'

import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import ListItemLink from '../ListItemLink/ListItemLink'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

const DrawerAside = ({ isOpen, handleCloseDrawer }: DrawerProps) => {
  const theme = useTheme()

  return (
    <Drawer variant="temporary" open={isOpen} onClose={handleCloseDrawer}>
      <Box
        width={theme.spacing(30)}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box
          width="100%"
          height={theme.spacing(15)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            sx={{
              height: theme.spacing(10),
              width: theme.spacing(10),
            }}
            src="/logo.png"
            alt="Logo da página"
          />
        </Box>

        <Divider />

        <Box flex={1}>
          <List>
            <ListItemLink
              text="Página inicial"
              Icon={HomeIcon}
              onclick={handleCloseDrawer}
              to="/"
            />
            <ListItemLink
              text="Clientes"
              Icon={GroupIcon}
              onclick={handleCloseDrawer}
              to="/clientes"
            />
            <ListItemLink
              text="Condutores"
              Icon={LocalShippingIcon}
              onclick={handleCloseDrawer}
              to="/condutores"
            />
            <ListItemLink
              text="Veículos"
              Icon={DirectionsCarIcon}
              onclick={handleCloseDrawer}
              to="/veiculos"
            />
            <ListItemLink
              text="Deslocamentos"
              Icon={AddLocationAltIcon}
              onclick={handleCloseDrawer}
              to="/deslocamentos"
            />
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerAside
