'use client'
import { Box, ThemeProvider } from '@mui/material'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LightTheme } from '@/themes/Light'
import { DarkTheme } from '@/themes/Dark'

import {
  IThemeContextProps,
  IThemeProviderProps,
} from '@/@types/contexts/IThemeContextTypes'

const ThemeContext = createContext<IThemeContextProps>({
  themeName: 'light',
  toggleTheme: () => {},
})

export const AppThemeProvider = ({ children }: IThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): IThemeContextProps => {
  return useContext(ThemeContext)
}
