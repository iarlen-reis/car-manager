'use client'
import React from 'react'
import {
  Drawer,
  List,
  useTheme,
  Box,
  Avatar,
  Divider,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import GroupIcon from '@mui/icons-material/Group'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useThemeContext } from '@/contexts/ThemeContext'
import ListItemLink from '../ListItemLink/ListItemLink'

import { DrawerProps } from '@/@types/components/IDrawerTypes'

const DrawerAside = ({ isOpen, handleCloseDrawer }: DrawerProps) => {
  const theme = useTheme()
  const { toggleTheme, themeName } = useThemeContext()

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
        <Box display="flex">
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              {themeName === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText>Alterar tema</ListItemText>
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerAside
