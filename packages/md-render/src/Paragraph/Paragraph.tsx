import React from 'react'
import { InlineContent } from '@ruslan-sedziukh/md-types/dist/md-types'
import Content from '../Content'
import styles from './styles.module.css'

type Props = {
  content: InlineContent[]
}

const Paragraph = ({ content }: Props) => {
  return (
    <p className={styles.paragraph}>
      <Content content={content} />
    </p>
  )
}

export default Paragraph
