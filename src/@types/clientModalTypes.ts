export interface IClientProps {
  nome: string
  numeroDocumento: string
  tipoDocumento: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
  id: number
}

export interface IClientModalProps {
  isOpen: boolean
  isLoadingCreate: boolean
  client: IClientProps | null
  handleModal: () => void
  createClient: (client: IClientProps) => void
  updateClient: (client: IClientProps) => void
  deleteClient: (id: number) => void
}
