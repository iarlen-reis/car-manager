'use client'
import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { IListItemLinkProps } from '@/@types/components/IListItemLinkTypes'

import { useRouter, usePathname } from 'next/navigation'

const ListItemLink = ({ text, Icon, to, onclick }: IListItemLinkProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    onclick()
    router.push(to)
  }
  return (
    <ListItemButton onClick={handleClick} selected={pathname === to}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItemButton>
  )
}

export default ListItemLink
