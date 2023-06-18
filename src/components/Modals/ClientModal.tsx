import React, { useEffect } from 'react'
import { Box, Button, Modal, Typography, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import FTextField from '../FTextField/FTextField'
import FTwoTextFields from '../FTextField/FTwoTextFields'
import { FormProvider, useForm } from 'react-hook-form'

interface IClient {
  nome: string
  numeroDocumento: string
  tipoDocumento: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
  id: number
}

interface IModalProps {
  isOpen: boolean
  handleCloseModal: () => void
  client: IClient | null
}

const ClientModal = ({ isOpen, handleCloseModal, client }: IModalProps) => {
  const queryClient = useQueryClient()

  const methods = useForm<IClient>()

  const createClient = useMutation(
    (client: IClient) => api.post('/cliente', client),
    {
      onSuccess: (data, variables) => {
        const client = JSON.parse(data.config.data)

        const clientOlds = queryClient.getQueryData<IClient[]>(['clients'])

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

  const updateClient = useMutation(
    (updatedClient: IClient) =>
      api.put(`/cliente/${updatedClient.id}`, updatedClient),
    {
      onSuccess: (data, updatedClient) => {
        const clientUpdated = JSON.parse(data.config.data)

        queryClient.setQueryData<IClient[] | undefined>(
          ['clients'],
          (oldData) => {
            if (oldData) {
              return oldData.map((client: IClient) =>
                client.id === clientUpdated.id ? clientUpdated : client,
              )
            }
            return oldData
          },
        )
      },
    },
  )

  const handleCreateClient = (data: IClient) => {
    if (client && client.id) {
      updateClient.mutate({ ...data, id: client.id })
      methods.reset()
      handleCloseModal()
      return
    }

    createClient.mutate(data)
    methods.reset()
    handleCloseModal()

    methods.reset()

    handleCloseModal()
  }

  useEffect(() => {
    if (client) {
      methods.setValue('nome', client.nome)
      methods.setValue('numeroDocumento', client.numeroDocumento)
      methods.setValue('tipoDocumento', client.tipoDocumento)
      methods.setValue('cidade', client.cidade)
      methods.setValue('uf', client.uf)
      methods.setValue('bairro', client.bairro)
      methods.setValue('numero', client.numero)
      methods.setValue('logradouro', client.logradouro)
      return
    }
    methods.reset()
  }, [client, methods])

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleCreateClient)}
          style={{
            background: '#FFF',
            padding: 20,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h1" fontSize={25}>
              Novo cliente
            </Typography>
            <Button variant="outlined" onClick={handleCloseModal}>
              <CloseIcon color="error" />
            </Button>
          </Box>
          <Box width="100%" display="flex" flexDirection="column" gap={1.5}>
            <FTextField
              name="nome"
              label="Nome"
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <FTwoTextFields
              name="numeroDocumento"
              name2="tipoDocumento"
              label="Número do documento"
              label2="Tipo"
              width="70%"
              width2="30%"
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <FTwoTextFields
              name="cidade"
              name2="uf"
              label="Cidade"
              label2="UF"
              width="70%"
              width2="30%"
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <FTwoTextFields
              name="logradouro"
              name2="numero"
              label="Logradouro"
              label2="Número"
              width="70%"
              width2="30%"
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <FTextField
              name="bairro"
              label="Bairro"
              rules={{ required: 'O campo é obrigatório.' }}
            />
          </Box>
          {!client ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!!client}
            >
              {createClient.isLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                'Adicionar'
              )}
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="secondary">
              Editar
            </Button>
          )}
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ClientModal
