import React, { ReactNode } from 'react'
import { isHeading, ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import Heading from '../Heading'
import Paragraph from '../Paragraph/Paragraph'

type Props = {
  parsedMarkdown: ParsedMarkdown
}

const Markdown = ({ parsedMarkdown: content }: Props) => {
  return <>{getMarkdownElements(content)}</>
}

const getMarkdownElements = (parsedMarkdown: ParsedMarkdown): ReactNode => {
  return parsedMarkdown.map((element) => {
    if (isHeading(element.type)) {
      return <Heading content={element.content} type={element.type} />
    }

    return <Paragraph content={element.content} />
  })
}

export default Markdown
