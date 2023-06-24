'use client'
import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
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
  const theme = useTheme()
  const isSuperSmall = theme.breakpoints.down('xs')

  const handleOpenModal = (): void => {
    setDriver(null)
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
        pagePath="condutores"
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
