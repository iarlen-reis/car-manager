'use client'
import React from 'react'
import {
  Drawer as MUIDrawer,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from '@mui/material'

import { grey } from '@mui/material/colors'

import GroupIcon from '@mui/icons-material/Group'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

interface DrawerProps {
  isOpen: boolean
  handleCloseDrawer: () => void
}

const DrawerAside = ({ isOpen, handleCloseDrawer }: DrawerProps) => {
  return (
    <MUIDrawer
      anchor="left"
      open={isOpen}
      onClose={handleCloseDrawer}
      PaperProps={{ style: { background: grey[800], color: '#FFF' } }}
    >
      <List sx={{ width: 250 }}>
        <ListItem sx={{ marginBottom: 3 }}>
          <img src="/logo.png" alt="Imagem" width={'100%'} height={'100%'} />
        </ListItem>
        <ListItemButton onClick={handleCloseDrawer} sx={{ gap: 2 }}>
          <GroupIcon />
          <ListItemText primary="Clientes" />
        </ListItemButton>
        <ListItemButton onClick={handleCloseDrawer} sx={{ gap: 2 }}>
          <LocalShippingIcon />
          <ListItemText primary="Condutores" />
        </ListItemButton>
        <ListItemButton onClick={handleCloseDrawer} sx={{ gap: 2 }}>
          <AddLocationAltIcon />
          <ListItemText primary="Deslocamentos" />
        </ListItemButton>
        <ListItemButton onClick={handleCloseDrawer} sx={{ gap: 2 }}>
          <DirectionsCarIcon />
          <ListItemText primary="Veículos" />
        </ListItemButton>
      </List>
    </MUIDrawer>
  )
}

export default DrawerAside
