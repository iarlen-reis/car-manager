'use client'

import { useThemeContext } from '@/contexts/ThemeContext'
import { Box, Button } from '@mui/material'

export default function Home() {
  const { toggleTheme } = useThemeContext()

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={toggleTheme}>
        Alterar Tema!
      </Button>
    </Box>
  )
}
