import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import FTextField from '../FTextField/FTextField'
import FTwoTextFields from '../FTextField/FTwoTextFields'
import { FormProvider, useForm } from 'react-hook-form'
import FTextFieldDate from '../FTextField/FTextFieldDate'
import { formateDate, modifyDate } from '@/utils/formatDate'

interface IDriver {
  id: number
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
  catergoriaHabilitacao?: string
}

interface IDriverModalProps {
  isOpen: boolean
  deleteDriver: (id: number) => void
  handleModal: () => void
  createDriver: (driver: IDriver) => void
  updateDriver: (driver: IDriver) => void
  driver: IDriver | null
}

const DriverModal = ({
  isOpen,
  handleModal,
  deleteDriver,
  createDriver,
  updateDriver,
  driver,
}: IDriverModalProps) => {
  const methods = useForm<IDriver>()
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '10px' : isMedium ? '14px' : '18px'

  const handleCloseAndClearFields = () => {
    methods.reset()

    handleModal()
  }

  const handleCreateDriver = (data: IDriver) => {
    if (driver) {
      const update = { ...data, id: driver.id }

      updateDriver(update)
      methods.reset()
      handleModal()
      return
    }

    const driverUpdated = {
      ...data,
    }

    createDriver(driverUpdated)
    methods.reset()
    handleModal()
  }

  useEffect(() => {
    if (driver?.id && driver.catergoriaHabilitacao) {
      methods.setValue('nome', driver.nome)
      methods.setValue('numeroHabilitacao', driver.numeroHabilitacao)
      methods.setValue('categoriaHabilitacao', driver.catergoriaHabilitacao)
      const dateFormated = formateDate(driver.vencimentoHabilitacao)

      const reformatedDate = modifyDate(dateFormated)

      methods.setValue('vencimentoHabilitacao', reformatedDate)
    } else {
      methods.reset()
    }
  }, [driver, methods])

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
            onSubmit={methods.handleSubmit(handleCreateDriver)}
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
              <Typography fontSize={20} color={theme.palette.secondary.dark}>
                Cadastrar condutor
              </Typography>
              <Button variant="text" onClick={handleModal}>
                <CloseIcon color="error" />
              </Button>
            </Box>
            <FTextField
              name="nome"
              label="Nome"
              rules={{ required: 'O campo é obrigatório.' }}
              disabled={!!driver}
            />
            <FTwoTextFields
              name="numeroHabilitacao"
              name2="categoriaHabilitacao"
              label="Número da Habilitação"
              label2="Categoria"
              width="70%"
              width2="30%"
              rules={{ required: 'O campo é obrigatório.' }}
              disabled={!!driver}
            />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="10px" variant="button" color="#9e9e9e">
                Vencimento
              </Typography>
              <FTextFieldDate
                name="vencimentoHabilitacao"
                rules={{ required: 'O campo é obrigatório.' }}
              />
            </Box>
            {!driver ? (
              <Button variant="contained" color="primary" type="submit">
                <Typography
                  variant="button"
                  color={theme.palette.primary.light}
                  fontWeight={600}
                >
                  Adicionar
                </Typography>
              </Button>
            ) : (
              <Box width="100%" display="flex" alignItems="center" gap={1}>
                <Button
                  onClick={() => deleteDriver(driver.id)}
                  variant="contained"
                  color="error"
                  sx={{ width: '50%', minHeight: '35px' }}
                >
                  <Typography
                    color={theme.palette.primary.light}
                    fontWeight={600}
                    sx={{ fontSize }}
                  >
                    Deletar
                  </Typography>
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ minHeight: '35px' }}
                >
                  <Typography
                    color={theme.palette.primary.light}
                    fontWeight={600}
                    sx={{ fontSize }}
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

export default DriverModal
