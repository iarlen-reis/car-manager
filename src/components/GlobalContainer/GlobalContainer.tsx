'use client'
import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { ToastContainer } from 'react-toastify'

interface IGlobalContainerProps {
  children: ReactNode
}

const GlobalContainer = ({ children }: IGlobalContainerProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mx-auto min-h-screen max-w-[1350px] px-5">{children}</div>
      <ToastContainer />
      <Footer />
    </QueryClientProvider>
  )
}

export default GlobalContainer
