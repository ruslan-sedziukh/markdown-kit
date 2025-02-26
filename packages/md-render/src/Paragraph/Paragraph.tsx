import React from 'react'
import { InlineContent } from '@ruslan-sedziukh/md-types/dist/md-types'
import Content from '../Content'

type Props = {
  content: InlineContent[]
}

const Paragraph = ({ content }: Props) => {
  return (
    <p>
      <Content content={content} />
    </p>
  )
}

export default Paragraph
