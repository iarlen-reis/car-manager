import './globals.css'
import React from 'react'
import Header from '@/components/Header/Header'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import ContainerGlobal from '@/components/ContainerGlobal/ContainerGlobal'

import { Inter } from 'next/font/google'
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
            <Header />
            {children}
          </ContainerGlobal>
        </AppThemeProvider>
      </body>
    </html>
  )
}
