import { IDriverProps } from '../modals/driverModalTypes'

export interface IUseDriverProps {
  drivers: IDriverProps[] | undefined
  driver: IDriverProps | null
  driversLoading: boolean
  createDriver: (driver: IDriverProps) => void
  updateDriver: (driver: IDriverProps) => void
  searchDriver: (id: number) => void
  deleteDriver: (id: number) => void
  setDriver: (state: IDriverProps | null) => void
}
