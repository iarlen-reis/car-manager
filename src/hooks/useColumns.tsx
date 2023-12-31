import { IUseColumnsProps } from '@/@types/hooks/IUseColumnsTypes'
import { Button, Typography } from '@mui/material'

import React from 'react'

const useColumns = (): IUseColumnsProps => {
  const clientColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'nome',
      headerName: 'NOME',
      flex: 1,
      renderCell: (params: any) => (
        <Button color="inherit">
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: 'numeroDocumento',
      headerName: 'NÚMERO DO DOCUMENTO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'tipoDocumento',
      headerName: 'TIPO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'cidade',
      headerName: 'CIDADE',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'uf',
      headerName: 'UF',
      width: 100,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'bairro',
      headerName: 'BAIRRO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'logradouro',
      headerName: 'LOGRADOURO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'numero',
      headerName: 'NÚMERO',
      width: 80,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
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
        <Typography variant="overline" color="black" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'nome',
      headerName: 'NOME',
      flex: 1,
      renderCell: (params: any) => (
        <Button color="secondary">
          <Typography variant="overline" color="black">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: 'numeroHabilitacao',
      headerName: 'Número de Habilitação',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'catergoriaHabilitacao',
      headerName: 'Categoria',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'vencimentoHabilitacao',
      headerName: 'Vencimento',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
  ]

  const vehiclesColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'placa',
      headerName: 'PLACA',
      flex: 1,
      renderCell: (params: any) => (
        <Button color="secondary">
          <Typography variant="overline" color="black">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: 'marcaModelo',
      headerName: 'MARCA/MODELO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'anoFabricacao',
      headerName: 'ANO DE FABRICAÇÃO',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'kmAtual',
      headerName: 'KM ATUAL',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
  ]

  const displacementsColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'idCondutor',
      headerName: 'Condutor ID',
      flex: 1,
      renderCell: (params: any) => (
        <Button color="secondary">
          <Typography variant="overline" color="black">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: 'idVeiculo',
      headerName: 'Veículo ID',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'idCliente',
      headerName: 'Cliente ID',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'inicioDeslocamento',
      headerName: 'Inicio do Deslocamento',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'fimDeslocamento',
      headerName: 'Fim do Deslocamento',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="overline" color="black">
          {params.value}
        </Typography>
      ),
    },
  ]
  return { clientColumns, driverColumns, vehiclesColumns, displacementsColumns }
}

export default useColumns
