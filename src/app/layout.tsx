import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import Header from '@/components/Header/Header'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import ContainerGlobal from '@/components/ContainerGlobal/ContainerGlobal'

import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Car manager',
  description: 'Faça o gerenciamento dos seus veículos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppThemeProvider>
          <ContainerGlobal>
            <ToastContainer />
            <Header />
            {children}
          </ContainerGlobal>
        </AppThemeProvider>
      </body>
    </html>
  )
}
