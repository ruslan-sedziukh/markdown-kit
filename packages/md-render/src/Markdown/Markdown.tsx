import React, { ReactNode } from 'react'
import styles from './styles.module.css'
import { isHeading, ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import Heading from '../Heading'

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
  })
}

export default Markdown
