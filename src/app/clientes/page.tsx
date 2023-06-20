'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import ClientModal from '@/components/Modals/ClientModal'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import useColumns from '@/hooks/useColumns'
import { useClients } from '@/hooks/useClients'

const Cliente = () => {
  const [openModal, setOpenModal] = useState(false)
  const {
    clientes,
    clientsLoading,
    createClient,
    isLoadingCreate,
    updateClient,
    deleteClient,
    client,
    clientSearch,
    setClient,
  } = useClients()

  const { clientColumns } = useColumns()

  console.log('oieee')

  const handleOpenModal = () => {
    setClient(null)
    setOpenModal(!openModal)
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={3}>
      <MenuTools
        handleOpenModal={handleOpenModal}
        textButton="Novo cliente"
        description="Página de cliente."
      />

      <DataGridTable
        handleOpenModal={handleOpenModal}
        handleShow={clientSearch}
        handleDelete={deleteClient}
        columns={clientColumns}
        rows={clientes}
        loading={clientsLoading}
      />

      <ClientModal
        isOpen={openModal}
        isLoadingCreate={isLoadingCreate}
        handleModal={handleOpenModal}
        client={client}
        createClient={createClient}
        updateClient={updateClient}
        deleteClient={deleteClient}
      />
    </Box>
  )
}

export default Cliente
