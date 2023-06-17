import React, { FormEvent, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TwoInput } from '../TwoInput/TwoInput'

interface IModalProps {
  isOpen: boolean
  handleCloseModal: () => void
  client?: number | null
}

const ClientModal = ({ isOpen, handleCloseModal, client }: IModalProps) => {
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

    const Client = {
      numeroDocumento: document,
      tipoDocumento: documentType,
      logradouro: publicPlace,
      numero: numberHome,
      cidade: city,
      name,
      uf,
      bairro: neighborhood,
    }

    console.log(Client)
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
            <Button variant="contained" color="secondary" type="submit">
              <Typography>Criar cliente</Typography>
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
