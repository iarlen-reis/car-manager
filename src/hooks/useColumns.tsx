import { Button, Typography, useTheme } from '@mui/material'

import React from 'react'

interface IClientColumns {
  field: string
  headerName: string
  width: number
  renderCell: (params: any) => React.JSX.Element
}

interface IUseColumns {
  clientColumns: IClientColumns[]
}

const useColumns = (): IUseColumns => {
  const { palette } = useTheme()

  const clientColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      renderCell: (params: any) => (
        <Typography
          variant="overline"
          color={palette.secondary.dark}
          fontWeight="bold"
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'nome',
      headerName: 'NOME',
      width: 150,
      renderCell: (params: any) => (
        <Button onClick={() => console.log(params.row.id)} color="secondary">
          <Typography variant="overline">{params.value}</Typography>
        </Button>
      ),
    },
    {
      field: 'numeroDocumento',
      headerName: 'NÚMERO DO DOCUMENTO',
      width: 170,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'tipoDocumento',
      headerName: 'TIPO',
      width: 80,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'cidade',
      headerName: 'CIDADE',
      width: 150,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'uf',
      headerName: 'UF',
      width: 100,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'bairro',
      headerName: 'BAIRRO',
      width: 140,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'logradouro',
      headerName: 'LOGRADOURO',
      width: 150,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'numero',
      headerName: 'NÚMERO',
      width: 80,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
  ]
  return { clientColumns }
}

export default useColumns
