import { ElementType } from 'react'

export interface IListItemLinkProps {
  text: string
  Icon: ElementType
  to: string
  onclick: () => void
}
