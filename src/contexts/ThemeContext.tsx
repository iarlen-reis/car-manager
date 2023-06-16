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

interface IThemeContext {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

interface IThemeProviderProps {
  children: React.ReactNode
}
const ThemeContext = createContext<IThemeContext>({
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

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
