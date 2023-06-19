'use client'

import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import useColumns from '@/hooks/useColumns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import VehicleModal from '@/components/Modals/vehicleModal'

interface IVehiclesProps {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

const Veiculos = () => {
  const queryClient = useQueryClient()
  const [vehicle, setVehicle] = useState<IVehiclesProps | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { vehiclesColumns } = useColumns()

  const handleOpenModal = () => {
    setVehicle(null)
    setIsOpenModal(!isOpenModal)
  }

  // get all vehicles: Busca todos veiculos
  const { data: vehicles, isLoading: loadingVehicles } = useQuery(
    ['vehicles'],
    async () => {
      const response = await api.get<IVehiclesProps[]>('/veiculo')

      return response.data
    },
  )

  // get a vehicle: Busca um veiculo
  const { mutate: searchVehicle } = useMutation(
    (id: number) => api.get<IVehiclesProps>(`/veiculo/${id}`),
    {
      onSuccess: (data) => {
        const vehicle = data.data as IVehiclesProps

        setVehicle(vehicle)
        setIsOpenModal(true)
      },
    },
  )

  // create a vehicle: Cria um veiculo
  const { mutate: createVehicle } = useMutation(
    (vehicle: IVehiclesProps) => api.post('/veiculo', vehicle),
    {
      onSuccess: (data) => {
        const vehicle = JSON.parse(data.config.data) as IVehiclesProps

        const vehiclesOlds = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])
        if (vehiclesOlds) {
          const newVehicles = [
            ...vehiclesOlds,
            {
              ...vehicle,
              id: vehiclesOlds.length,
            },
          ]

          queryClient.setQueryData(['vehicles'], newVehicles)
        }
      },
    },
  )

  // update a vehicle: Atualiza um veiculo
  const { mutate: updateVehicle } = useMutation(
    (vehicle: IVehiclesProps) => api.put(`/veiculo/${vehicle.id}`, vehicle),
    {
      onSuccess: (data) => {
        const vehicleUpdated = JSON.parse(data.config.data) as IVehiclesProps

        const oldVehicles = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])

        const newVehicles = oldVehicles?.map((vehicle) => {
          if (vehicle.id === vehicleUpdated.id) {
            vehicle = vehicleUpdated
          }
          return vehicle
        })
        queryClient.setQueryData(['vehicles'], newVehicles)
      },
    },
  )

  // delete a vehicle: Deleta um veiculo
  const { mutate: deleteVehicle } = useMutation(
    (id: number) =>
      api.delete(`/veiculo/${id}`, {
        data: {
          id,
        },
      }),
    {
      onSuccess: (data) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id

        const oldVehicles = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])

        const newVehicles = oldVehicles?.filter((vehicle) => vehicle.id !== id)

        queryClient.setQueryData(['vehicles'], newVehicles)
      },
    },
  )
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <MenuTools
        description="Página de veículos"
        textButton="novo veiculo"
        handleOpenModal={handleOpenModal}
      />
      <DataGridTable
        columns={vehiclesColumns}
        rows={vehicles}
        loading={loadingVehicles}
        handleDelete={deleteVehicle}
        handleOpenModal={handleOpenModal}
        handleShow={searchVehicle}
      />
      <VehicleModal
        isOpen={isOpenModal}
        handleModal={handleOpenModal}
        createVehicle={createVehicle}
        updateVehicle={updateVehicle}
        deleteVehicle={deleteVehicle}
        vehicle={vehicle}
      />
    </Box>
  )
}

export default Veiculos
