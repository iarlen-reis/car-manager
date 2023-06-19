export interface IDriverProps {
  id: number
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
  catergoriaHabilitacao?: string
}

export interface IDriverModalProps {
  isOpen: boolean
  deleteDriver: (id: number) => void
  handleModal: () => void
  createDriver: (driver: IDriverProps) => void
  updateDriver: (driver: IDriverProps) => void
  driver: IDriverProps | null
}
