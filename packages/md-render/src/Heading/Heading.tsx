import { Types as HeadingTypes } from '@ruslan-sedziukh/md-types'
import React, { ElementType, ReactNode } from 'react'
import styles from './styles.module.css'

type Props = {
  type: HeadingTypes
  children: ReactNode
}

const Heading = ({ type, children }: Props) => {
  const Component = getRootElement(type)

  return <Component>{children}</Component>
}

const Heading1 = ({ children }: { children: ReactNode }) => {
  return <h1 className={styles.heading1}>{children}</h1>
}

const Heading2 = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.heading2}>{children}</h2>
}

const Heading3 = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.heading3}>{children}</h2>
}

const getRootElement = (type: HeadingTypes): ElementType => {
  if (type === HeadingTypes.Heading1) {
    return Heading1
  } else if (type === HeadingTypes.Heading2) {
    return Heading2
  }

  return Heading3
}

export default Heading
