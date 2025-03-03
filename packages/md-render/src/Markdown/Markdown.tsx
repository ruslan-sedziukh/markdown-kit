import React, { ReactNode } from 'react'
import { isHeading, ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import Heading from '../Heading'
import Paragraph from '../Paragraph/Paragraph'
import Content from '../Content'

type Props = {
  parsedMarkdown: ParsedMarkdown
}

const Markdown = ({ parsedMarkdown: content }: Props) => {
  return <>{getMarkdownElements(content)}</>
}

const getMarkdownElements = (parsedMarkdown: ParsedMarkdown): ReactNode => {
  return parsedMarkdown.map((element) => {
    if (isHeading(element.type)) {
      return (
        <Heading type={element.type}>
          <Content content={element.content} />
        </Heading>
      )
    }

    return (
      <Paragraph>
        <Content content={element.content} />
      </Paragraph>
    )
  })
}

export default Markdown
