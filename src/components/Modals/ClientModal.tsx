import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FTextField from '../FTextField/FTextField'
import FTwoTextFields from '../FTextField/FTwoTextFields'
import { FormProvider, useForm } from 'react-hook-form'

import {
  IClientProps,
  IClientModalProps,
} from '@/@types/modals/clientModalTypes'
import { Add, DeleteForever, Edit } from '@mui/icons-material'

const ClientModal = ({
  isOpen,
  isLoadingCreate,
  handleModal,
  deleteClient,
  createClient,
  updateClient,
  client,
}: IClientModalProps) => {
  const theme = useTheme()

  const methods = useForm<IClientProps>()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '16px' : isMedium ? '16px' : '18px'

  const handleCloseAndClearFields = () => {
    methods.reset()

    handleModal()
  }

  const handleCreateClient = (data: IClientProps) => {
    if (client && client.id) {
      updateClient({ ...data, id: client.id })
      methods.reset()
      handleCloseAndClearFields()
      return
    }

    createClient(data)
    methods.reset()
    handleCloseAndClearFields()
  }

  const handleDeleteClient = () => {
    if (client?.id) {
      deleteClient(client?.id)
      handleModal()
    }
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
      onClose={handleCloseAndClearFields}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleCreateClient)}
            style={{
              background: theme.palette.background.default,
              padding: 20,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              maxWidth: 400,
              width: '100%',
              border: '1px solid',
              borderColor: theme.palette.secondary.main,
            }}
          >
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontSize={fontSize}
                color={theme.palette.secondary.dark}
              >
                {!client ? 'Cadastrar cliente' : 'Editar cliente'}
              </Typography>
              <Button variant="text" onClick={handleModal}>
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
                disabled={!!client}
                disabled2={!!client}
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
                color="primary"
                disabled={!!client}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {isLoadingCreate ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  <>
                    <Add />
                    <Typography
                      color={theme.palette.primary.light}
                      fontWeight={600}
                    >
                      Adicionar
                    </Typography>
                  </>
                )}
              </Button>
            ) : (
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="right"
                gap={1}
              >
                <Button
                  onClick={handleDeleteClient}
                  variant="contained"
                  color="error"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  <DeleteForever fontSize="small" />
                  <Typography
                    color={theme.palette.primary.light}
                    fontWeight={600}
                  >
                    Deletar
                  </Typography>
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <Edit fontSize="small" />
                  <Typography
                    color={theme.palette.primary.light}
                    fontWeight={600}
                  >
                    Editar
                  </Typography>
                </Button>
              </Box>
            )}
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}

export default ClientModal
