'use client'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

interface IListItemLinkProps {
  text: string
  Icon: React.ElementType
  to: string
  onclick: () => void
}

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
