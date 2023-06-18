'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import ClientModal from '@/components/Modals/ClientModal'
import DataGridTable from '@/components/DataGrid/DataGridTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import useColumns from '@/hooks/useColumns'

interface IClient {
  id: number
  nome: string
  numeroDocumento: string
  tipoDocumento: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
}

const Cliente = () => {
  const [openModal, setOpenModal] = useState(false)
  const [clientSearchData, setClientSearchData] = useState<IClient | null>(null)
  const { clientColumns } = useColumns()

  const queryClient = useQueryClient()

  const { data: clientes, isFetching } = useQuery(
    ['clients'],
    async () => {
      const response = await api.get<IClient[] | undefined>('/cliente')

      return response.data
    },
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: true,
    },
  )

  const deleteClient = useMutation(
    (id: number) => {
      return api.delete(`Cliente/${id}`, {
        data: { id },
      })
    },
    {
      onSuccess: (data, variables) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id
        const oldClients = queryClient.getQueryData<IClient[]>(['clients'])

        if (oldClients) {
          const newClients = oldClients?.filter((client) => client.id !== id)

          queryClient.setQueryData(['clients'], newClients)
        }
      },
    },
  )

  const { mutate: clientSearch } = useMutation(
    (id: number) => {
      return api.get<IClient>(`/cliente/${id}`)
    },
    {
      onSuccess: (data) => {
        if (data.data) {
          setClientSearchData(data.data)

          setOpenModal(true)
        } else {
          setClientSearchData(null)
        }
      },
    },
  )

  const handleOpenModal = () => {
    setClientSearchData(null)
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
        handleShow={clientSearch}
        deleteMutation={deleteClient.mutate}
        columns={clientColumns}
        rows={clientes}
        loading={isFetching}
      />

      <ClientModal
        isOpen={openModal}
        handleCloseModal={handleOpenModal}
        client={clientSearchData}
        deleteMutation={deleteClient.mutate}
      />
    </Box>
  )
}

export default Cliente
