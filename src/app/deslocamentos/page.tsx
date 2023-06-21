'use client'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import MenuTools from '@/components/MenuTools/MenuTools'
import DisplacementModal from '@/components/Modals/DisplacementModal'

import useColumns from '@/hooks/useColumns'
import { useDisplacements } from '@/hooks/useDisplacements'
import { Box } from '@mui/material'
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

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
    setDisplacement(null)
  }
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={3}>
      <MenuTools
        description="Pagina de deslocamento"
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
