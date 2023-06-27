import React, { useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material'

import {
  IVehiclesProps,
  IVehicleModalProps,
} from '@/@types/modals/vehiclesModalTypes'

import { normalizeLicensePlate } from '@/masks/masks'

import FTwoTextFields from '../FTextField/FTwoTextFields'

import CloseIcon from '@mui/icons-material/Close'
import { Add, DeleteForever, Edit } from '@mui/icons-material'

import { FormProvider, useForm } from 'react-hook-form'

const VehicleModal = ({
  vehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
  handleModal,
  isOpen,
}: IVehicleModalProps) => {
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '14px' : isMedium ? '16px' : '18px'

  const methods = useForm<IVehiclesProps>()

  const placeVehicle = methods.watch('placa')

  const handleCloseModalAndClearFields = () => {
    methods.reset()
    handleModal()
  }

  // Create a vehicle or update: Cria um veiculo ou atualiza
  const handleCreateVehicleOrUpdate = (data: IVehiclesProps) => {
    if (vehicle && vehicle.id) {
      updateVehicle(data)
      handleCloseModalAndClearFields()
      return
    }

    createVehicle(data)
    handleCloseModalAndClearFields()
  }

  const handleDeleteVehicle = () => {
    if (vehicle) {
      deleteVehicle(vehicle.id)
      handleCloseModalAndClearFields()
    }
  }

  useEffect(() => {
    methods.setValue('placa', normalizeLicensePlate(placeVehicle))
  }, [placeVehicle, methods])

  // load all datas of vehicle: Carrega todos dados de um veiculo
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
            onSubmit={methods.handleSubmit(handleCreateVehicleOrUpdate)}
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
                {!vehicle ? 'Cadastrar veículo' : 'Editar veículo'}
              </Typography>
              <Button variant="text" onClick={handleCloseModalAndClearFields}>
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
                <div className="flex items-center justify-center gap-1">
                  <Add fontSize="small" />
                  <Typography variant="button" fontWeight={600}>
                    Adicionar
                  </Typography>
                </div>
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
                  <div className="flex items-center justify-center gap-1">
                    <DeleteForever fontSize="small" />
                    <Typography variant="button" fontWeight={600}>
                      Deletar
                    </Typography>
                  </div>
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  <div className="flex items-center justify-center gap-1">
                    <Edit fontSize="small" />
                    <Typography variant="button" fontWeight={600}>
                      Editar
                    </Typography>
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

export default VehicleModal
