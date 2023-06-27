import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'

import { Poppins, Itim, Ysabeau } from 'next/font/google'
import GlobalContainer from '@/components/GlobalContainer/GlobalContainer'

const poppinsFonts = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const YSabeauFonts = Ysabeau({
  subsets: ['latin'],
  weight: ['200', '400', '500', '700'],
  variable: '--font-ysabeau',
})

const itimFonts = Itim({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-itim',
})

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
      <body
        className={`${poppinsFonts.variable} ${itimFonts.variable} ${YSabeauFonts.variable} font-poppins`}
      >
        <GlobalContainer>{children}</GlobalContainer>
      </body>
    </html>
  )
}
