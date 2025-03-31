import React, { ReactNode } from 'react'
import styles from './styles.module.css'

type Props = {
  children: ReactNode
}

const List = ({ children }: Props) => {
  return <ul className={styles.list}>{children}</ul>
}

export default List
