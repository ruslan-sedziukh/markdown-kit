import React from 'react'

type Props = {
  children: React.ReactNode
}

const Bold = ({ children }: Props) => {
  return <b>{children}</b>
}

export default Bold
