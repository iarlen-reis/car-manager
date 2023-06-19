import { ReactNode } from 'react'

export interface IThemeContextProps {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

export interface IThemeProviderProps {
  children: ReactNode
}
