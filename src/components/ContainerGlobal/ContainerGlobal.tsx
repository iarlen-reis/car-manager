'use client'
import React from 'react'
import { Container } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IContainerGlobalProps {
  children: React.ReactNode
}

const client = new QueryClient()

const ContainerGlobal = ({ children }: IContainerGlobalProps) => {
  return (
    <Container maxWidth="xl">
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Container>
  )
}

export default ContainerGlobal
