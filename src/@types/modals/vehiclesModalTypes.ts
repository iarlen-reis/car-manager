export interface IVehiclesProps {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export interface IVehicleModalProps {
  isOpen: boolean
  vehicle: IVehiclesProps | null
  handleModal: () => void
  deleteVehicle: (id: number) => void
  createVehicle: (vehicle: IVehiclesProps) => void
  updateVehicle: (vehicle: IVehiclesProps) => void
}
