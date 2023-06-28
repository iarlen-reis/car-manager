'use client'
import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Head from 'next/head'

import DataGridTable from '@/components/DataGridTable/DataGridTable'
import DisplacementModal from '@/components/Modals/DisplacementModal'
import MenuTools from '@/components/MenuTools/MenuTools'

import useColumns from '@/hooks/useColumns'
import { useDisplacements } from '@/hooks/useDisplacements'

const Deslocamento = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

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

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
    setDisplacement(null)
  }
  return (
    <>
      <Head>
        <title>Gerenciamento de deslocamentos</title>
        <meta
          name="keyworkds"
          content="listar deslocamentos, iniciar deslocamento, encerrar deslocamento, deletar deslocamento"
        ></meta>
        <meta
          name="description"
          content="Gerencie seus deslocamento de forma fácil e eficiente"
        ></meta>
      </Head>
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
    </>
  )
}

export default Deslocamento
