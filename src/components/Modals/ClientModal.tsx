import React, { useEffect } from 'react'

import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  IClientProps,
  IClientModalProps,
} from '@/@types/modals/clientModalTypes'

import {
  normalizeCnhNumber,
  normalizeCnpjNumber,
  normalizeCpfNumber,
  normalizeRgNumber,
} from '@/masks/masks'

import FTextField from '../FTextField/FTextField'
import FSelectField from '../FTextField/FSelectField'
import FTwoTextFields from '../FTextField/FTwoTextFields'
import { optionsTypeDocument } from '@/utils/optionsFSelectField'

import CloseIcon from '@mui/icons-material/Close'
import { Add, DeleteForever, Edit } from '@mui/icons-material'

import { FormProvider, useForm } from 'react-hook-form'

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

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '16px' : isMedium ? '16px' : '18px'

  const methods = useForm<IClientProps>()

  const documentWatch = methods.watch('numeroDocumento')
  const typeDocumentWatch = methods.watch('tipoDocumento')

  const handleCloseModalAndClearFields = () => {
    methods.reset()
    handleModal()
  }

  // Create or update a client: Cria ou atualiza um cliente
  const handleCreateOrUpdateClient = (data: IClientProps) => {
    if (client && client.id) {
      updateClient({
        ...data,
        id: client.id,
      })
      handleCloseModalAndClearFields()
      return
    }

    createClient(data)
    handleCloseModalAndClearFields()
  }

  const handleDeleteClient = () => {
    if (client?.id) {
      deleteClient(client?.id)
      handleModal()
    }
  }

  // Add mask on inputs: Adiciona mascara nos inputs
  useEffect(() => {
    if (typeDocumentWatch && typeDocumentWatch.toLowerCase() === 'cpf') {
      methods.setValue('numeroDocumento', normalizeCpfNumber(documentWatch))
    }
    if (typeDocumentWatch && typeDocumentWatch.toLowerCase() === 'cnpj') {
      methods.setValue('numeroDocumento', normalizeCnpjNumber(documentWatch))
    }
    if (typeDocumentWatch && typeDocumentWatch.toLowerCase() === 'rg') {
      methods.setValue('numeroDocumento', normalizeRgNumber(documentWatch))
    }
    if (typeDocumentWatch && typeDocumentWatch.toLowerCase() === 'cnh') {
      methods.setValue('numeroDocumento', normalizeCnhNumber(documentWatch))
    }
  }, [documentWatch, typeDocumentWatch, methods])

  // Load all datas of client: Carrega todos dados do cliente.
  useEffect(() => {
    if (client) {
      methods.setValue('nome', client.nome)
      methods.setValue('numeroDocumento', client.numeroDocumento)
      methods.setValue('tipoDocumento', client.tipoDocumento.toLowerCase())
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
      onClose={handleCloseModalAndClearFields}
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
            onSubmit={methods.handleSubmit(handleCreateOrUpdateClient)}
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
              <Typography fontSize={fontSize}>
                {!client ? 'Cadastrar cliente' : 'Editar cliente'}
              </Typography>
              <Button variant="text" onClick={handleCloseModalAndClearFields}>
                <CloseIcon color="error" />
              </Button>
            </Box>
            <Box width="100%" display="flex" flexDirection="column" gap={1.5}>
              <FTextField
                name="nome"
                label="Nome"
                rules={{ required: 'O campo é obrigatório.' }}
              />
              <div className="flex w-full items-center gap-1">
                <div className="w-1/3">
                  <FSelectField
                    label="Tipo"
                    name="tipoDocumento"
                    options={optionsTypeDocument}
                    disabled={!!client}
                  />
                </div>
                <FTextField
                  label="Número do Documento"
                  name="numeroDocumento"
                  disabled={!!client}
                />
              </div>
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
              >
                {isLoadingCreate ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <Add fontSize="small" />
                    <Typography fontWeight={600}>Adicionar</Typography>
                  </div>
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
                >
                  <div className="flex items-center justify-center gap-1">
                    <DeleteForever fontSize="small" />
                    <Typography fontWeight={600}>Deletar</Typography>
                  </div>
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  <div className="flex items-center justify-center gap-1">
                    <Edit fontSize="small" />
                    <Typography fontWeight={600}>Editar</Typography>
                  </div>
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
