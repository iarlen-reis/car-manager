'use client'
import {
  Box,
  Button,
  Paper,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { v4 as uuidv4 } from 'uuid'

import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

import { IDataGridTableProps } from '@/@types/components/IDataGridTableTypes'

const DataGridTable = ({
  handleShow,
  handleDelete,
  handleOpenModal,
  columns,
  rows,
  loading,
}: IDataGridTableProps) => {
  const { breakpoints } = useTheme()

  const isSuperSmall = useMediaQuery(breakpoints.down('xs'))
  const isSmall = useMediaQuery(breakpoints.down('sm'))
  const isMedium = useMediaQuery(breakpoints.down('md'))
  const isLarge = useMediaQuery(breakpoints.down('lg'))

  const updatedColumns = columns.map((column) => ({
    ...column,
    key: uuidv4(),
  }))

  updatedColumns[1].renderCell = (params: GridCellParams) => (
    <Button
      onClick={() => {
        handleShow(params.row.id)
      }}
      color="secondary"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography
        variant="overline"
        width="100%"
        height="100%"
        textAlign="start"
      >
        {params.value as string}
      </Typography>
    </Button>
  )

  updatedColumns.push({
    field: 'show',
    headerName: 'EXIBIR',
    flex: 1,
    renderCell: (params: GridCellParams) => (
      <Button
        variant="text"
        sx={{
          width: 'fit-content',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => {
          handleShow(params.row.id)
        }}
      >
        <SearchIcon color="success" />
      </Button>
    ),
  })

  updatedColumns.push({
    field: 'delete',
    headerName: 'DELETAR',
    flex: 1,
    renderCell: (params: GridCellParams) => (
      <Button
        variant="text"
        sx={{
          width: 'fit-content',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => {
          handleDelete(params.row.id)
        }}
      >
        <DeleteIcon color="error" />
      </Button>
    ),
  })

  const columnsStartLarge = updatedColumns.slice(0, 4)
  const columnsEndLarge = updatedColumns.slice(-2)

  const columnsLarge = columnsStartLarge.concat(columnsEndLarge)

  const columnsStartMedium = updatedColumns.slice(0, 3)
  const columnsEndMedium = updatedColumns.slice(-2)

  const columnsMedium = columnsStartMedium.concat(columnsEndMedium)

  const columnsStartSmall = updatedColumns.slice(0, 1)
  const columnsEndSmall = updatedColumns.slice(-2)

  const columnsSmall = columnsStartSmall.concat(columnsEndSmall)

  const columnStartSuperSmall = updatedColumns.slice(1, 2)
  const columnsEndSuperSmall = updatedColumns.slice(-2)

  const columnsSuperSmall = columnStartSuperSmall.concat(columnsEndSuperSmall)

  console.log(columnsSuperSmall)
  return (
    <Box
      component={Paper}
      height={490}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <>
        {!loading && rows !== undefined ? (
          <DataGrid
            columns={
              isSuperSmall
                ? columnsSuperSmall
                : isSmall
                ? columnsSmall
                : isMedium
                ? columnsMedium
                : isLarge
                ? columnsLarge
                : updatedColumns
            }
            rows={rows}
          />
        ) : (
          <CircularProgress size={30} color="secondary" />
        )}
      </>
    </Box>
  )
}

export default DataGridTable
