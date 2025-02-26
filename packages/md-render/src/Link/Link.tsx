import React, { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

const Link = ({ href, children }: Props) => {
  return <a href={href}>{children}</a>
}

export default Link
