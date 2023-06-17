'use client'
import React, { useState } from 'react'
import { Box, Button, Paper, Typography, useTheme } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import ClientModal from '@/components/Modals/ClientModal'

const Cliente = () => {
  const theme = useTheme()
  const [selectedClient, setSelectedClient] = useState<null | number>(null)
  const [openModal, setOpenModal] = useState(false)

  const handleStateModal = () => {
    setOpenModal(!openModal)
    setSelectedClient(null)
  }

  const handleSelectClient = (clientID: number) => {
    setSelectedClient(clientID)
    setOpenModal(true)
  }

  return (
    <Box width="100%">
      <Box
        component={Paper}
        width="100%"
        height={theme.spacing(7)}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
        paddingY={1}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="overline" color="blue">
              Clientes Cadastrados: 4
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline" color="red">
              Clientes Irregulares: 4
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          startIcon={<AddIcon />}
          onClick={handleStateModal}
        >
          <Typography variant="button">criar cliente</Typography>
        </Button>
      </Box>
      <Button onClick={() => handleSelectClient(1)}>Cliente 1</Button>
      <ClientModal
        isOpen={openModal}
        handleCloseModal={handleStateModal}
        client={selectedClient}
      />
    </Box>
  )
}

export default Cliente
