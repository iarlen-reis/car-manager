import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'

import {
  IDriverModalProps,
  IDriverProps,
} from '@/@types/modals/driverModalTypes'

import { normalizeCnhNumber } from '@/masks/masks'

import FTextField from '../FTextField/FTextField'
import FSelectField from '../FTextField/FSelectField'
import FTextFieldDate from '../FTextField/FTextFieldDate'
import { optionsLicenseCategory } from '@/utils/optionsFSelectField'

import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import { Add, DeleteForever, Edit } from '@mui/icons-material'

import { FormProvider, useForm } from 'react-hook-form'
import { backToStringDate, dateActual, formateDate } from '@/utils/formatDate'

const DriverModal = ({
  isOpen,
  handleModal,
  deleteDriver,
  createDriver,
  updateDriver,
  driver,
}: IDriverModalProps) => {
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '14px' : isMedium ? '16px' : '18px'

  const methods = useForm<IDriverProps>()

  const licenseDocument = methods.watch('numeroHabilitacao')

  const handleCloseModalAndClearFields = () => {
    methods.reset()
    handleModal()
  }

  // Create or update a driver: cria ou atuliza um condutor
  const handleCreateDriver = (data: IDriverProps) => {
    if (driver && driver.catergoriaHabilitacao) {
      if (data.categoriaHabilitacao.includes(driver.catergoriaHabilitacao)) {
        const update = { ...data, id: driver.id }

        if (formateDate(update.vencimentoHabilitacao) < dateActual()) {
          methods.setError('vencimentoHabilitacao', {
            message: 'Habilitação vencida.',
          })
          return
        }

        updateDriver(update)

        handleCloseModalAndClearFields()
        return
      } else {
        methods.setError('categoriaHabilitacao', {
          type: 'value',
        })

        toast.error('Não é possível remover uma categoria.')
        return
      }
    }

    createDriver(data)
    handleCloseModalAndClearFields()
  }

  const handleDeleteAndCloseModal = () => {
    if (driver) {
      deleteDriver(driver.id)
      handleCloseModalAndClearFields()
    }
  }

  useEffect(() => {
    if (licenseDocument && licenseDocument.length !== 0) {
      methods.setValue('numeroHabilitacao', normalizeCnhNumber(licenseDocument))
    }
  }, [licenseDocument, methods])

  useEffect(() => {
    if (driver?.id && driver.catergoriaHabilitacao) {
      methods.setValue('nome', driver.nome)
      methods.setValue('numeroHabilitacao', driver.numeroHabilitacao)

      methods.setValue(
        'categoriaHabilitacao',
        driver.catergoriaHabilitacao.toLowerCase(),
      )

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
              <Button variant="text" onClick={handleCloseModalAndClearFields}>
                <CloseIcon color="error" />
              </Button>
            </Box>
            <FTextField
              name="nome"
              label="Nome"
              rules={{ required: 'O campo é obrigatório.' }}
              disabled={!!driver}
            />
            <div className="flex w-full items-center gap-1">
              <div className="w-1/3">
                <FSelectField
                  label="Categoria"
                  name="categoriaHabilitacao"
                  options={optionsLicenseCategory}
                />
              </div>
              <div className="w-full">
                <FTextField
                  label="Número Habilitação"
                  name="numeroHabilitacao"
                  disabled={!!driver}
                />
              </div>
            </div>
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
