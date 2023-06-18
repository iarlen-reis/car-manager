'use client'
import { Box, Button, Paper, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { v4 as uuidv4 } from 'uuid'

import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

interface IDataGridTableProps {
  columns: any[]
  rows: any[] | undefined
  loading: boolean
  handleShow: (id: number) => void
  deleteMutation: (id: number) => void
}

const DataGridTable = ({
  handleShow,
  deleteMutation,
  columns,
  rows,
  loading,
}: IDataGridTableProps) => {
  const updatedColumns = columns.map((column) => ({
    ...column,
    key: uuidv4(),
  }))

  updatedColumns[1].renderCell = (params: GridCellParams) => (
    <Button
      onClick={() => handleShow(params.row.id)}
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
        <SearchIcon color="success" />
      </Button>
    ),
  })

  updatedColumns.push({
    field: 'delete',
    headerName: 'DELETAR',
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
        onClick={() => deleteMutation(params.row.id)}
      >
        <DeleteIcon color="error" />
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
        {!loading && rows !== undefined ? (
          <DataGrid columns={updatedColumns} rows={rows} />
        ) : (
          <CircularProgress size={30} color="secondary" />
        )}
      </>
    </Box>
  )
}

export default DataGridTable
