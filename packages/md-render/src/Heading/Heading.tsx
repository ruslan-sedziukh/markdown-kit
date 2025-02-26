import { Heading as HeadingType } from '@ruslan-sedziukh/md-types'
import { InlineContent } from '@ruslan-sedziukh/md-types/dist/md-types'
import React, { ElementType } from 'react'
import Content from '../Content'

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

const getRootElement = (type: HeadingType): ElementType => {
  if (type === HeadingType.heading1) {
    return 'h1'
  } else if (type === HeadingType.heading2) {
    return 'h2'
  }

  return 'h3'
}

export default Heading
