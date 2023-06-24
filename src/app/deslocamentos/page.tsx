'use client'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import MenuTools from '@/components/MenuTools/MenuTools'
import DisplacementModal from '@/components/Modals/DisplacementModal'

import useColumns from '@/hooks/useColumns'
import { useDisplacements } from '@/hooks/useDisplacements'
import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'

const Deslocamento = () => {
  const {
    displacements,
    displacementsLoading,
    createDisplacement,
    displacement,
    searchDisplacement,
    setDisplacement,
    updateDisplacement,
    deleteDisplacement,
  } = useDisplacements()
  const { displacementsColumns } = useColumns()
  const theme = useTheme()
  const isSuperSmall = theme.breakpoints.down('xs')
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
    setDisplacement(null)
  }
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={isSuperSmall ? 5 : 3}
    >
      <MenuTools
        pagePath="deslocamentos"
        textButton="novo deslocamento"
        isLoading={displacementsLoading}
        handleOpenModal={handleOpenModal}
      />
      <DataGridTable
        columns={displacementsColumns}
        rows={displacements}
        loading={displacementsLoading}
        handleOpenModal={handleOpenModal}
        handleShow={searchDisplacement}
        handleDelete={deleteDisplacement}
      />
      <DisplacementModal
        isOpen={isOpenModal}
        handleOpenModal={handleOpenModal}
        createDisplacement={createDisplacement}
        displacement={displacement}
        updateDisplacement={updateDisplacement}
        deleteDisplacement={deleteDisplacement}
      />
    </Box>
  )
}

export default Deslocamento
