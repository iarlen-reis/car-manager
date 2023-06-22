import React, { useEffect } from 'react'
import {
  Box,
  Modal,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import FTextField from '../FTextField/FTextField'
import FTwoTextFields from '../FTextField/FTwoTextFields'
import FTextFieldDate from '../FTextField/FTextFieldDate'
import { useClients } from '@/hooks/useClients'
import FSelectField from '../FTextField/FSelectField'

import CloseIcon from '@mui/icons-material/Close'
import { useDrivers } from '@/hooks/useDrivers'
import useVehicles from '@/hooks/useVehicles'
import { modifyDate } from '@/utils/formatDate'
import { toast } from 'react-toastify'
import {
  IDisplacementsProps,
  IDisplacementModalProps,
} from '@/@types/modals/displacementModalTypes'
import { DeleteForever, Done, Flag } from '@mui/icons-material'

const DisplacementModal = ({
  isOpen,
  handleOpenModal,
  createDisplacement,
  displacement,
  updateDisplacement,
  deleteDisplacement,
}: IDisplacementModalProps) => {
  const methods = useForm<IDisplacementsProps>()

  const { clientes } = useClients()
  const { drivers } = useDrivers()
  const { vehicles } = useVehicles()

  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const fontSize = isSmall ? '14px' : isMedium ? '16px' : '18px'

  const handleCloseModalAndClearFields = () => {
    methods.reset()
    handleOpenModal()
  }

  const handleDeleteCloseModalAndClearFields = () => {
    if (displacement && displacement.id) {
      deleteDisplacement(displacement.id)
      handleCloseModalAndClearFields()
    }
  }

  const handleCreateOrUpdateDisplacement = (data: IDisplacementsProps) => {
    if (displacement && displacement.id) {
      const updateDisplacementData = {
        ...data,
        id: displacement.id,
        kmFinal: Number(data.kmFinal),
      }

      if (Number(data.kmFinal) < Number(displacement.kmInicial)) {
        toast.error('O Km final não pode ser menor que o Km inicial.')
        methods.setError('kmFinal', {
          message: 'Valor menor que o Km inicial.',
        })
        return
      }

      if (data.inicioDeslocamento > data.fimDeslocamento) {
        toast.error('O Fim do deslocamento não pode ser menor que o inicio.')
        methods.setError('fimDeslocamento', {
          message: 'Valor menor que a data inicial.',
        })
        return
      }

      updateDisplacement(updateDisplacementData)

      handleCloseModalAndClearFields()
      return
    }

    createDisplacement(data)
    handleCloseModalAndClearFields()
  }

  useEffect(() => {
    if (displacement && displacement.id) {
      methods.setValue('idCliente', displacement.idCliente)
      methods.setValue('idCondutor', displacement.idCondutor)
      methods.setValue('idVeiculo', displacement.idVeiculo)
      methods.setValue('checkList', displacement.checkList)
      methods.setValue('motivo', displacement.motivo)
      methods.setValue('kmInicial', displacement.kmInicial)
      methods.setValue('kmFinal', displacement.kmFinal)
      methods.setValue('observacao', displacement.observacao)
      methods.setValue(
        'inicioDeslocamento',
        modifyDate(displacement.inicioDeslocamento),
      )
      methods.setValue(
        'fimDeslocamento',
        modifyDate(displacement.fimDeslocamento),
      )
    } else {
      methods.reset()
    }
  }, [displacement, methods])

  return (
    <Modal
      open={isOpen}
      onClose={handleOpenModal}
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
            onSubmit={methods.handleSubmit(handleCreateOrUpdateDisplacement)}
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
                {displacement
                  ? 'Encerrar deslocamento'
                  : 'Iniciar deslocamento'}
              </Typography>
              <Button variant="text" onClick={handleOpenModal}>
                <CloseIcon color="error" />
              </Button>
            </Box>

            <Box width="100%" display="flex" alignItems="center" gap={1}>
              <FSelectField
                label="Cliente"
                name="idCliente"
                options={clientes || []}
                disabled={!!displacement}
                rules={{ required: 'O campo é obrigatório.' }}
              />
              <FSelectField
                label="Condutor"
                name="idCondutor"
                options={drivers || []}
                disabled={!!displacement}
                rules={{ required: 'O campo é obrigatório.' }}
              />
            </Box>
            <Box width="100%" display="flex" alignItems="center" gap={1}>
              <FSelectField
                label="Veículo"
                name="idVeiculo"
                options={vehicles || []}
                disabled={!!displacement}
                rules={{ required: 'O campo é obrigatório.' }}
              />
              <FTextField
                name="kmInicial"
                label="KM Inicial"
                disabled={!!displacement}
                rules={{ required: 'O campo é obrigatório.' }}
              />
            </Box>
            <FTwoTextFields
              name="motivo"
              name2="checkList"
              label="Motivo"
              label2="CheckList"
              width="50%"
              width2="50%"
              disabled={!!displacement}
              disabled2={!!displacement}
              rules={{ required: 'O campo é obrigatório.' }}
            />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="10px" variant="button" color="#9e9e9e">
                Inicio do deslocamento
              </Typography>
              <FTextFieldDate
                name="inicioDeslocamento"
                rules={{ required: 'O campo é obrigatório.' }}
                disabled={!!displacement}
              />
            </Box>
            <FTextField name="observacao" label="Observações" />
            {displacement && (
              <>
                <FTextField name="kmFinal" label="KM Final" />
                <Box display="flex" flexDirection="column">
                  <Typography fontSize="10px" variant="button" color="#9e9e9e">
                    Fim do deslocamento
                  </Typography>
                  <FTextFieldDate
                    name="fimDeslocamento"
                    rules={{ required: 'O campo é obrigatório.' }}
                  />
                </Box>
              </>
            )}

            {!displacement ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                }}
              >
                <Flag fontSize="small" />
                <Typography
                  variant="button"
                  color={theme.palette.primary.light}
                  fontWeight={600}
                >
                  Iniciar
                </Typography>
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
                  variant="contained"
                  color="error"
                  onClick={handleDeleteCloseModalAndClearFields}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  <DeleteForever fontSize="small" />
                  <Typography
                    variant="button"
                    color={theme.palette.primary.light}
                    fontWeight={600}
                  >
                    Deletar
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  <Done fontSize="small" />
                  <Typography
                    variant="button"
                    color={theme.palette.primary.light}
                    fontWeight={600}
                  >
                    Encerrar
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

export default DisplacementModal
