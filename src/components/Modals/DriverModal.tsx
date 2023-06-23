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
import { backToStringDate, formateDate } from '@/utils/formatDate'

import {
  IDriverModalProps,
  IDriverProps,
} from '@/@types/modals/driverModalTypes'
import { toast } from 'react-toastify'
import { Add, DeleteForever, Edit } from '@mui/icons-material'

const DriverModal = ({
  isOpen,
  handleModal,
  deleteDriver,
  createDriver,
  updateDriver,
  driver,
}: IDriverModalProps) => {
  const methods = useForm<IDriverProps>()
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '14px' : isMedium ? '16px' : '18px'

  const handleCloseAndClearFields = () => {
    methods.reset()

    handleModal()
  }

  const handleCreateDriver = (data: IDriverProps) => {
    if (driver && driver.catergoriaHabilitacao) {
      if (data.categoriaHabilitacao.includes(driver.catergoriaHabilitacao)) {
        const update = { ...data, id: driver.id }

        if (
          formateDate(update.vencimentoHabilitacao) <
          new Date().toLocaleDateString()
        ) {
          methods.setError('vencimentoHabilitacao', {
            message: 'Habilitação vencida.',
          })
          return
        }

        updateDriver(update)
        methods.reset()
        handleModal()
        return
      } else {
        methods.setError('categoriaHabilitacao', {
          type: 'value',
        })

        toast.error('Não é possível remover uma categoria.')
        return
      }
    }

    const driverCreated = {
      ...data,
    }

    createDriver(driverCreated)
    methods.reset()
    handleModal()
  }

  const handleDeleteAndCloseModal = () => {
    if (driver) {
      deleteDriver(driver.id)
      methods.reset()
      handleModal()
    }
  }

  useEffect(() => {
    if (driver?.id && driver.catergoriaHabilitacao) {
      methods.setValue('nome', driver.nome)
      methods.setValue('numeroHabilitacao', driver.numeroHabilitacao)
      methods.setValue('categoriaHabilitacao', driver.catergoriaHabilitacao)

      methods.setValue(
        'vencimentoHabilitacao',
        backToStringDate(driver.vencimentoHabilitacao),
      )
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
              background: '#FFF',
              padding: 20,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              maxWidth: 400,
              width: '100%',
              border: '1px solid',
            }}
          >
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={fontSize}>
                {!driver ? 'Cadastrar condutor' : 'Editar condutor'}
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
                <div className="flex items-center justify-center gap-1">
                  <Add fontSize="small" />
                  <Typography variant="button" fontWeight={600}>
                    Adicionar
                  </Typography>
                </div>
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
                  onClick={handleDeleteAndCloseModal}
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

export default DriverModal
