import React, { FormEvent, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TwoInput } from '../TwoInput/TwoInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'

interface IModalProps {
  isOpen: boolean
  handleCloseModal: () => void
  client?: number | null
}

interface IClient {
  nome: string
  numeroDocumento: string
  tipoDocumento: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
}

const ClientModal = ({ isOpen, handleCloseModal, client }: IModalProps) => {
  const queryClient = useQueryClient()

  const createClient = useMutation(
    (client: IClient) => api.post('/cliente', client),
    {
      onSuccess: (data, variables) => {
        const client = JSON.parse(data.config.data)

        console.log(client)

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

  const [name, setName] = useState<string>('')
  const [document, setDocument] = useState<string>('')
  const [documentType, setdocumentType] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [uf, setUf] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [publicPlace, setPublicPlace] = useState<string>('')
  const [numberHome, setNumberHome] = useState<string>('')

  const handleCreateClient = (event: FormEvent) => {
    event.preventDefault()

    const clientData = {
      numeroDocumento: document,
      tipoDocumento: documentType,
      logradouro: publicPlace,
      numero: numberHome,
      cidade: city,
      nome: name,
      uf,
      bairro: neighborhood,
    }

    createClient.mutate(clientData)

    handleCloseModal()
  }

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
      <form
        onSubmit={handleCreateClient}
        style={{
          background: '#FFF',
          padding: 20,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
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
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl>
            <TextField
              id="nome"
              label="Nome"
              onBlur={(event) => setName(event.target.value as string)}
              required
            />
          </FormControl>
          <FormControl>
            <TwoInput
              idTextOne="document"
              idTextTwo="documentType"
              labelTextOne="Número do documento"
              labelTextTwo="Tipo"
              setTextOne={setDocument}
              setTextTwo={setdocumentType}
            />
          </FormControl>
          <FormControl>
            <TwoInput
              idTextOne="city"
              idTextTwo="uf"
              labelTextOne="Cidade"
              labelTextTwo="UF"
              setTextOne={setCity}
              setTextTwo={setUf}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="neighborhood"
              label="Bairro"
              onBlur={(event) => setNeighborhood(event.target.value as string)}
              required
            />
          </FormControl>
          <FormControl>
            <TwoInput
              idTextOne="publicPlace"
              idTextTwo="numberHome"
              labelTextOne="Logradouro"
              labelTextTwo="Número"
              setTextOne={setPublicPlace}
              setTextTwo={setNumberHome}
              widthField="50%"
            />
          </FormControl>
        </Box>
        {!client ? (
          <FormControl>
            <Button
              sx={{ padding: 1 }}
              variant="contained"
              color="secondary"
              type="submit"
              disabled={createClient.isLoading}
            >
              {createClient.isLoading ? (
                <CircularProgress size={15} color="secondary" />
              ) : (
                <Typography>Criar cliente</Typography>
              )}
            </Button>
          </FormControl>
        ) : (
          <FormControl>
            <Button variant="contained" color="error" type="submit">
              <Typography>Deletar cliente</Typography>
            </Button>
          </FormControl>
        )}
      </form>
    </Modal>
  )
}

export default ClientModal
