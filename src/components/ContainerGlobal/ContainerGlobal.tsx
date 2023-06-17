'use client'
import React from 'react'
import { Container } from '@mui/material'

interface IContainerGlobalProps {
  children: React.ReactNode
}

const ContainerGlobal = ({ children }: IContainerGlobalProps) => {
  return <Container maxWidth="xl">{children}</Container>
}

export default ContainerGlobal
