'use client'

import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import useColumns from '@/hooks/useColumns'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import VehicleModal from '@/components/Modals/vehicleModal'

import useVehicles from '@/hooks/useVehicles'

const Veiculos = () => {
  const {
    vehicles,
    loadingVehicles,
    vehicle,
    setVehicle,
    searchVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  } = useVehicles()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { vehiclesColumns } = useColumns()

  const handleOpenModal = () => {
    setVehicle(null)
    setIsOpenModal(!isOpenModal)
  }

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
