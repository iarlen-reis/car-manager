'use client'
import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Head from 'next/head'

import DataGridTable from '@/components/DataGridTable/DataGridTable'
import MenuTools from '@/components/MenuTools/MenuTools'
import DriverModal from '@/components/Modals/DriverModal'

import useColumns from '@/hooks/useColumns'
import { useDrivers } from '@/hooks/useDrivers'

const Condutores = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

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

  const theme = useTheme()
  const isSuperSmall = theme.breakpoints.down('xs')

  const handleOpenModal = (): void => {
    setDriver(null)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <Head>
        <title>Gerenciamento de condutores</title>
        <meta
          name="keyworkds"
          content="listar condutores, criar condutores, editar condutores, deletar condutores"
        ></meta>
        <meta
          name="description"
          content="Gerencie seus condutores de forma fácil e eficiente"
        ></meta>
      </Head>
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
    </>
  )
}

export default Condutores
