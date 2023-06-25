import { IColumnsProps } from '../hooks/IUseColumnsTypes'

export interface IDataGridTableProps {
  columns: IColumnsProps[]
  rows: any[] | undefined
  loading: boolean
  handleShow: (id: number) => void
  handleDelete: (id: number) => void
  handleOpenModal: () => void
}
