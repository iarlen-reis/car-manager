'use client'
import { Box, Button, Paper, CircularProgress } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { v4 as uuidv4 } from 'uuid'

import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

interface IDataGridTableProps {
  columns: any[]
  rows: any[] | null
  loading: boolean
  handleShow: (id: number) => void
  handleDelete: (id: number) => void
}

const DataGridTable = ({
  handleShow,
  handleDelete,
  columns,
  rows,
  loading,
}: IDataGridTableProps) => {
  const updatedColumns = columns.map((column) => ({
    ...column,
    key: uuidv4(),
  }))

  updatedColumns.push({
    field: 'show',
    headerName: 'Exibir',
    width: 100,
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
        onClick={() => handleShow(params.row.id)}
      >
        <SearchIcon color="secondary" />
      </Button>
    ),
    key: uuidv4(),
  })

  updatedColumns.push({
    field: 'delete',
    headerName: 'Deletar',
    width: 100,
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
        onClick={() => handleDelete(params.row.id)}
      >
        <DeleteIcon color="secondary" />
      </Button>
    ),
    key: uuidv4(),
  })

  return (
    <Box
      component={Paper}
      width="100%"
      height={490}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <>
        {!loading && rows !== null ? (
          <DataGrid columns={updatedColumns} rows={rows} />
        ) : (
          <CircularProgress size={30} color="secondary" />
        )}
      </>
    </Box>
  )
}

export default DataGridTable
