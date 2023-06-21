import { IVehiclesProps } from '../modals/vehiclesModalTypes'

export interface IUseVehiclesProps {
  vehicles: IVehiclesProps[] | undefined
  vehicle: IVehiclesProps | null
  loadingVehicles: boolean
  createVehicle: (vehicle: IVehiclesProps) => void
  searchVehicle: (id: number) => void
  updateVehicle: (vehicle: IVehiclesProps) => void
  deleteVehicle: (id: number) => void
  setVehicle: (state: IVehiclesProps | null) => void
}
