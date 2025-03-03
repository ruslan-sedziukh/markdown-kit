import React, { ReactNode } from 'react'
import styles from './styles.module.css'

type Props = {
  children: ReactNode
}

const Paragraph = ({ children }: Props) => {
  return <p className={styles.paragraph}>{children}</p>
}

export default Paragraph
