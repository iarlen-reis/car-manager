'use client'
import { Box, Button, Paper, CircularProgress } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'

import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

interface IDataGridTableProps {
  columns: any[]
  rows: any[]
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
  columns.push({
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
  })

  columns.push({
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
        {!loading ? (
          <DataGrid columns={columns} rows={rows} />
        ) : (
          <CircularProgress size={30} color="secondary" />
        )}
      </>
    </Box>
  )
}

export default DataGridTable
