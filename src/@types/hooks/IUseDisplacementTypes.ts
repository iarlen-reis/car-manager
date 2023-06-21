import { IDisplacementsProps } from '../modals/displacementModalTypes'

export interface IUseDisplacementsProps {
  displacements: IDisplacementsProps[] | undefined
  displacement: IDisplacementsProps | null
  displacementsLoading: boolean
  createDisplacement: (displacement: IDisplacementsProps) => void
  searchDisplacement: (id: number) => void
  setDisplacement: (state: IDisplacementsProps | null) => void
  updateDisplacement: (displacement: IDisplacementsProps) => void
  deleteDisplacement: (id: number) => void
}
