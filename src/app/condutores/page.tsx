'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import useColumns from '@/hooks/useColumns'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import DriverModal from '@/components/Modals/DriverModal'
import { useDrivers } from '@/hooks/useDrivers'

const Condutores = () => {
  const {
    drivers,
    driversLoading,
    driver,
    searchDriver,
    setDriver,
    createDriver,
    updateDriver,
    deleteDriver,
  } = useDrivers()
  const { driverColumns } = useColumns()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleOpenModal = (): void => {
    setDriver(null)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={3}>
      <MenuTools
        description="Página de condutores"
        textButton="novo condutor"
        handleOpenModal={handleOpenModal}
        isLoading={driversLoading}
      />
      <DataGridTable
        columns={driverColumns}
        rows={drivers}
        loading={driversLoading}
        handleShow={searchDriver}
        handleDelete={deleteDriver}
        handleOpenModal={handleOpenModal}
      />
      <DriverModal
        handleModal={handleOpenModal}
        isOpen={isOpenModal}
        deleteDriver={deleteDriver}
        createDriver={createDriver}
        driver={driver}
        updateDriver={updateDriver}
      />
    </Box>
  )
}

export default Condutores
