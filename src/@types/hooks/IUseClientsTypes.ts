import { IClientProps } from '../modals/clientModalTypes'

export interface IUseClientsProps {
  clientes: IClientProps[] | undefined
  client: IClientProps | null
  clientsLoading: boolean
  isLoadingCreate: boolean
  createClient: (client: IClientProps) => void
  updateClient: (client: IClientProps) => void
  deleteClient: (id: number) => void
  clientSearch: (id: number) => void
  setClient: (state: IClientProps | null) => void
}
