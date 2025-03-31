import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ListItem = ({ children }: Props) => {
  return <li>{children}</li>
}

export default ListItem
