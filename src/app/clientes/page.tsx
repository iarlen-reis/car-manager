'use client'
import React, { useState } from 'react'
import { Box, Button, Paper, Typography, useTheme } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import ClientModal from '@/components/Modals/ClientModal'
import DataGridTable from '@/components/DataGrid/DataGridTable'
import { clientColumns } from '@/utils/columnsDataGrid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'

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
  const theme = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const [clientSearchData, setClientSearchData] = useState<IClient | null>(null)

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

          console.log(data.data.id)

          setOpenModal(true)
        } else {
          setClientSearchData(null)
        }
      },
    },
  )

  const handleStateModal = () => {
    setClientSearchData(null)
    setOpenModal(!openModal)
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={3}>
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

      <DataGridTable
        handleShow={clientSearch}
        deleteMutation={deleteClient.mutate}
        columns={clientColumns}
        rows={clientes}
        loading={isFetching}
      />

      <ClientModal
        isOpen={openModal}
        handleCloseModal={handleStateModal}
        client={clientSearchData}
      />
    </Box>
  )
}

export default Cliente
