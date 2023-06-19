import { Button, Typography, useTheme } from '@mui/material'

import React from 'react'

interface IClientColumns {
  field: string
  headerName: string
  width?: number
  flex?: number
  renderCell: (params: any) => React.JSX.Element
}

interface IDriverColumns {
  field: string
  headerName: string
  width?: number
  flex?: number
  renderCell: (params: any) => React.JSX.Element
}

interface IUseColumns {
  clientColumns: IClientColumns[]
  driverColumns: IDriverColumns[]
}

const useColumns = (): IUseColumns => {
  const { palette } = useTheme()

  const clientColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
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
      flex: 1,
      renderCell: (params: any) => (
        <Button onClick={() => console.log(params.row.id)} color="secondary">
          <Typography variant="overline">{params.value}</Typography>
        </Button>
      ),
    },
    {
      field: 'numeroDocumento',
      headerName: 'NÚMERO DO DOCUMENTO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'tipoDocumento',
      headerName: 'TIPO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'cidade',
      headerName: 'CIDADE',
      flex: 1,
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
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'logradouro',
      headerName: 'LOGRADOURO',
      flex: 1,
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

  const driverColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
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
      flex: 1,
      renderCell: (params: any) => (
        <Button onClick={() => console.log(params.row.id)} color="secondary">
          <Typography variant="overline">{params.value}</Typography>
        </Button>
      ),
    },
    {
      field: 'numeroHabilitacao',
      headerName: 'Número de Habilitação',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'catergoriaHabilitacao',
      headerName: 'Categoria',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'vencimentoHabilitacao',
      headerName: 'Vencimento',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color={palette.secondary.dark}>
          {params.value}
        </Typography>
      ),
    },
  ]
  return { clientColumns, driverColumns }
}

export default useColumns
