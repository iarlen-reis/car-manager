'use client'

import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
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
  const theme = useTheme()
  const isSuperSmall = theme.breakpoints.down('xs')

  const handleOpenModal = () => {
    setVehicle(null)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={isSuperSmall ? 5 : 3}
    >
      <MenuTools
        pagePath="veiculos"
        textButton="novo veiculo"
        handleOpenModal={handleOpenModal}
        isLoading={loadingVehicles}
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
