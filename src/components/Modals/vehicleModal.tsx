import React, { useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { FormProvider, useForm } from 'react-hook-form'
import FTwoTextFields from '../FTextField/FTwoTextFields'

interface IVehiclesProps {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

interface IVehicleModalProps {
  isOpen: boolean
  vehicle: IVehiclesProps | null
  handleModal: () => void
  deleteVehicle: (id: number) => void
  createVehicle: (vehicle: IVehiclesProps) => void
  updateVehicle: (vehicle: IVehiclesProps) => void
}

const VehicleModal = ({
  vehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
  handleModal,
  isOpen,
}: IVehicleModalProps) => {
  const methods = useForm<IVehiclesProps>()
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '14px' : isMedium ? '16px' : '18px'

  const handleCloseAndClearFields = () => {
    methods.reset()

    handleModal()
  }

  const handleCreateVehicleOrUpdate = (data: IVehiclesProps) => {
    if (vehicle && vehicle.id) {
      updateVehicle(data)
      handleCloseAndClearFields()
      return
    }

    createVehicle(data)
    handleCloseAndClearFields()
  }

  const handleDeleteVehicle = () => {
    if (vehicle) {
      deleteVehicle(vehicle.id)
      handleCloseAndClearFields()
    }
  }

  useEffect(() => {
    if (vehicle && vehicle.id) {
      methods.setValue('placa', vehicle.placa)
      methods.setValue('marcaModelo', vehicle.marcaModelo)
      methods.setValue('anoFabricacao', vehicle.anoFabricacao)
      methods.setValue('kmAtual', vehicle.kmAtual)
      methods.setValue('id', vehicle.id)
    } else {
      methods.reset()
    }
  }, [vehicle, methods])

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
            onSubmit={methods.handleSubmit(handleCreateVehicleOrUpdate)}
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
                Cadastrar veículo
              </Typography>
              <Button variant="text" onClick={handleCloseAndClearFields}>
                <CloseIcon color="error" />
              </Button>
            </Box>
            <FTwoTextFields
              name="placa"
              name2="marcaModelo"
              label="Placa"
              label2="Marca/Modelo"
              width="50%"
              width2="50%"
              disabled={!!vehicle}
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <FTwoTextFields
              name="anoFabricacao"
              name2="kmAtual"
              label="Ano de Fabricação"
              label2="KM Atual"
              width="70%"
              width2="30%"
              rules={{ required: 'O campo é obrigatório.' }}
            />
            {!vehicle ? (
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
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="right"
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteVehicle}
                >
                  <Typography
                    variant="button"
                    color={theme.palette.primary.light}
                    fontWeight={600}
                  >
                    Deletar
                  </Typography>
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  <Typography
                    variant="button"
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

export default VehicleModal