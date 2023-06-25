import React from 'react'

export interface IColumnsProps {
  field: string
  headerName: string
  width?: number
  flex?: number
  renderCell: (params: any) => React.JSX.Element
  key?: string
}

export interface IUseColumnsProps {
  clientColumns: IColumnsProps[]
  driverColumns: IColumnsProps[]
  vehiclesColumns: IColumnsProps[]
  displacementsColumns: IColumnsProps[]
}
