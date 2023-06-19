export interface IDataGridTableProps {
  columns: any[]
  rows: any[] | undefined
  loading: boolean
  handleShow: (id: number) => void
  handleDelete: (id: number) => void
  handleOpenModal: () => void
}
