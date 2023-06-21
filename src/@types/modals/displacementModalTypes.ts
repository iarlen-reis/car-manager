export interface IDisplacementsProps {
  id: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export interface IDisplacementModalProps {
  isOpen: boolean
  displacement: IDisplacementsProps | null
  handleOpenModal: () => void
  createDisplacement: (displacement: IDisplacementsProps) => void
  updateDisplacement: (displacement: IDisplacementsProps) => void
  deleteDisplacement: (id: number) => void
}
