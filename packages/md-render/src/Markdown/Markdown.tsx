import React, { ReactNode } from 'react'
import { isHeading, ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import Heading from '../Heading'
import Paragraph from '../Paragraph/Paragraph'
import Content from '../Content'
import { Components } from './types'
import List from '../List'

type Props = {
  parsedMarkdown: ParsedMarkdown
  components?: Components
}

const Markdown = ({ parsedMarkdown: content, components }: Props) => {
  return (
    <div>
      {content.map((element) => {
        if (isHeading(element)) {
          return (
            <Heading type={element.type} key={element.id}>
              <Content content={element.content} components={components} />
            </Heading>
          )
        }

        if (element.type === Types.UnorderedList) {
          return (
            <List key={element.id}>
              <Content content={element.content} components={components} />
            </List>
          )
        }

        return (
          <Paragraph key={element.id}>
            <Content content={element.content} components={components} />
          </Paragraph>
        )
      })}
    </div>
  )
}

export default Markdown
