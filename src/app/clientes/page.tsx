'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import ClientModal from '@/components/Modals/ClientModal'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import useColumns from '@/hooks/useColumns'

import { IClientProps } from '@/@types/modals/clientModalTypes'

const Cliente = () => {
  const [openModal, setOpenModal] = useState(false)
  const [clientSearchData, setClientSearchData] = useState<IClientProps | null>(
    null,
  )
  const { clientColumns } = useColumns()

  const queryClient = useQueryClient()

  // get all clients: Busca todos clientes
  const { data: clientes, isFetching } = useQuery(
    ['clients'],
    async () => {
      const response = await api.get<IClientProps[] | undefined>('/cliente')

      return response.data
    },
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: true,
    },
  )

  // create a new client: Cria um novo cliente
  const { mutate: createClient, isLoading: isLoadingCreate } = useMutation(
    (client: IClientProps) => api.post('/cliente', client),
    {
      onSuccess: (data, variables) => {
        const client = JSON.parse(data.config.data)

        const clientOlds = queryClient.getQueryData<IClientProps[]>(['clients'])

        if (clientOlds) {
          const newClients = [
            ...clientOlds,
            { ...client, id: clientOlds.length },
          ]

          queryClient.setQueryData(['clients'], newClients)
        }
      },
    },
  )

  // update a client: Atualiza um cliente.
  const { mutate: updateClient } = useMutation(
    (updatedClient: IClientProps) =>
      api.put(`/cliente/${updatedClient.id}`, updatedClient),
    {
      onSuccess: (data, updatedClient) => {
        const clientUpdated = JSON.parse(data.config.data)

        queryClient.setQueryData<IClientProps[] | undefined>(
          ['clients'],
          (oldData) => {
            if (oldData) {
              return oldData.map((client: IClientProps) =>
                client.id === clientUpdated.id ? clientUpdated : client,
              )
            }
            return oldData
          },
        )
      },
    },
  )

  // delete a client: Deleta um cliente
  const { mutate: deleteClient } = useMutation(
    (id: number) => {
      return api.delete(`Cliente/${id}`, {
        data: { id },
      })
    },
    {
      onSuccess: (data, variables) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id
        const oldClients = queryClient.getQueryData<IClientProps[]>(['clients'])

        if (oldClients) {
          const newClients = oldClients?.filter((client) => client.id !== id)

          queryClient.setQueryData(['clients'], newClients)
        }
      },
    },
  )

  // get a client: busca um cliente
  const { mutate: clientSearch } = useMutation(
    (id: number) => {
      return api.get<IClientProps>(`/cliente/${id}`)
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
        handleOpenModal={handleOpenModal}
        handleShow={clientSearch}
        handleDelete={deleteClient}
        columns={clientColumns}
        rows={clientes}
        loading={isFetching}
      />

      <ClientModal
        isOpen={openModal}
        isLoadingCreate={isLoadingCreate}
        handleModal={handleOpenModal}
        client={clientSearchData}
        createClient={createClient}
        updateClient={updateClient}
        deleteClient={deleteClient}
      />
    </Box>
  )
}

export default Cliente
