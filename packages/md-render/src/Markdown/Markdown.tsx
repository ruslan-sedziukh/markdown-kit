import React, { ReactNode } from 'react'
import { isHeading, ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import Heading from '../Heading'
import Paragraph from '../Paragraph/Paragraph'
import Content from '../Content'
import { Components } from './types'

type Props = {
  parsedMarkdown: ParsedMarkdown
  components?: Components
}

const Markdown = ({ parsedMarkdown: content, components }: Props) => {
  return content.map((element) => {
    if (isHeading(element.type)) {
      return (
        <Heading type={element.type}>
          <Content content={element.content} components={components} />
        </Heading>
      )
    }

    return (
      <Paragraph>
        <Content content={element.content} components={components} />
      </Paragraph>
    )
  })
}

export default Markdown
