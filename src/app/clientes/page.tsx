'use client'
import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Head from 'next/head'

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

  const theme = useTheme()
  const isSuperSmall = theme.breakpoints.down('xs')

  const handleOpenModal = () => {
    setClient(null)
    setOpenModal(!openModal)
  }

  return (
    <>
      <Head>
        <title>gerenciamento de clientes</title>
        <meta
          name="keyworkds"
          content="listar clientes, criar clientes, editar clientes, deletar cliente"
        ></meta>
        <meta
          name="description"
          content="Gerencie seus clientes de forma fácil e eficiente"
        ></meta>
      </Head>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        gap={isSuperSmall ? 5 : 3}
      >
        <MenuTools
          pagePath="clientes"
          handleOpenModal={handleOpenModal}
          textButton="Novo cliente"
          isLoading={clientsLoading}
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
    </>
  )
}

export default Cliente
