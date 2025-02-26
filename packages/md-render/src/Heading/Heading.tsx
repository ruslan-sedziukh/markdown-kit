import { Heading as HeadingType } from '@ruslan-sedziukh/md-types'
import { InlineContent } from '@ruslan-sedziukh/md-types/dist/md-types'
import React, { ElementType, ReactNode } from 'react'
import Content from '../Content'
import styles from './styles.module.css'

type Props = {
  type: HeadingType
  content: InlineContent[]
}

const Heading = ({ type, content }: Props) => {
  const Component = getRootElement(type)

  return (
    <Component>
      <Content content={content} />
    </Component>
  )
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

const getRootElement = (type: HeadingType): ElementType => {
  if (type === HeadingType.heading1) {
    return Heading1
  } else if (type === HeadingType.heading2) {
    return Heading2
  }

  return Heading3
}

export default Heading
